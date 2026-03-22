<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AppHeader from "./components/app/AppHeader.vue";
import EditorPanel from "./components/editor/EditorPanel.vue";
import EditorToolbar, {
  type ToolbarAction,
} from "./components/editor/EditorToolbar.vue";
import PresetSwitcher from "./components/editor/PresetSwitcher.vue";
import PreviewPanel from "./components/preview/PreviewPanel.vue";
import StatusBar from "./components/shared/StatusBar.vue";
import { useLocalDraft } from "./composables/useLocalDraft";
import { useMarkdown } from "./composables/useMarkdown";
import {
  getPresetTemplate,
  presetOptions,
  type PresetId,
} from "./data/presetTemplates";

const content = ref("");
const selectedPreset = ref<PresetId>("markdown");
const editorRef = ref<InstanceType<typeof EditorPanel> | null>(null);
const copyState = ref("Copy");

const { renderMarkdown } = useMarkdown();
const { clearDraft, lastSavedAt, loadDraft } = useLocalDraft(
  content,
  selectedPreset,
);

const previewHtml = computed(() => renderMarkdown(content.value));
const characterCount = computed(() => content.value.length);
const wordCount = computed(() => {
  const trimmed = content.value.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
});
const isEmpty = computed(() => !content.value.trim());
const selectedPresetOption = computed(
  () =>
    presetOptions.find((option) => option.id === selectedPreset.value) ??
    presetOptions[0],
);

const lastSavedLabel = computed(() => {
  if (!lastSavedAt.value) {
    return "Autosave ready";
  }

  return `Saved ${new Date(lastSavedAt.value).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })}`;
});

const headerActions = computed(() => [
  { label: copyState.value },
  { label: "Export" },
  { label: "Clear", tone: "danger" as const },
]);

async function copyMarkdown() {
  const value = content.value;

  try {
    await navigator.clipboard.writeText(value);
    copyState.value = "Copied";
  } catch {
    const helper = document.createElement("textarea");
    helper.value = value;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    document.body.removeChild(helper);
    copyState.value = "Copied";
  }

  window.setTimeout(() => {
    copyState.value = "Copy";
  }, 1800);
}

function exportMarkdown() {
  const blob = new Blob([content.value], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "markflow-export.md";
  link.click();
  URL.revokeObjectURL(url);
}

function clearInput() {
  content.value = "";
  clearDraft();
  editorRef.value?.focusEditor();
}

function handleHeaderAction(label: string) {
  if (label === "Export") {
    exportMarkdown();
    return;
  }

  if (label === "Clear") {
    clearInput();
    return;
  }

  copyMarkdown();
}

function handleToolbarAction(action: ToolbarAction) {
  editorRef.value?.applyFormatting(action);
}

function handlePresetChange(presetId: PresetId) {
  selectedPreset.value = presetId;
}

function insertPresetTemplate() {
  content.value = getPresetTemplate(selectedPreset.value);
  editorRef.value?.focusEditor();
}

onMounted(() => {
  loadDraft();

  if (!content.value && selectedPreset.value !== "markdown") {
    content.value = getPresetTemplate(selectedPreset.value);
  }
});
</script>

<template>
  <div class="app-shell">
    <AppHeader
      :actions="headerActions"
      :active-preset="selectedPresetOption.label"
      :last-saved-label="lastSavedLabel"
      @action="handleHeaderAction"
    />

    <main class="app-main">
      <section class="command-row">
        <PresetSwitcher
          :options="presetOptions"
          :selected-preset="selectedPreset"
          @change="handlePresetChange"
          @insert-template="insertPresetTemplate"
        />

        <EditorToolbar @action="handleToolbarAction" />
      </section>

      <section class="workspace-grid">
        <EditorPanel ref="editorRef" v-model="content" />
        <PreviewPanel :html="previewHtml" />
      </section>
    </main>

    <StatusBar
      :active-preset="selectedPresetOption.label"
      :characters="characterCount"
      :is-empty="isEmpty"
      :last-saved-label="lastSavedLabel"
      :words="wordCount"
    />
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.9rem;
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
}

.app-main {
  display: grid;
  gap: 0.9rem;
  min-height: 0;
}

.command-row {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.95fr);
}

.workspace-grid {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: 0;
}

@media (max-width: 1100px) {
  .command-row,
  .workspace-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .app-shell {
    padding: 0.8rem;
  }
}
</style>
