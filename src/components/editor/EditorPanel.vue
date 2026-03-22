<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import type { ToolbarAction } from "./EditorToolbar.vue";
import { useEditorFormatting } from "../../composables/useEditorFormatting";

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const formatter = useEditorFormatting();

const lineCount = computed(() => {
  if (!props.modelValue.trim()) {
    return 1;
  }

  return props.modelValue.split("\n").length;
});

const characterCount = computed(() => props.modelValue.length);

function updateValue(value: string) {
  emit("update:modelValue", value);
}

function focusEditor() {
  textareaRef.value?.focus();
}

function setSelection(start: number, end: number) {
  nextTick(() => {
    textareaRef.value?.focus();
    textareaRef.value?.setSelectionRange(start, end);
  });
}

function applyFormatting(action: ToolbarAction) {
  const textarea = textareaRef.value;

  if (!textarea) {
    return;
  }

  const selection = {
    start: textarea.selectionStart,
    end: textarea.selectionEnd,
  };

  const actionMap = {
    heading: formatter.applyHeading,
    bold: formatter.applyBold,
    italic: formatter.applyItalic,
    bullet: formatter.applyBulletList,
    quote: formatter.applyQuote,
    code: formatter.applyCodeBlock,
    link: formatter.applyLink,
  };

  const result = actionMap[action](props.modelValue, selection);
  updateValue(result.value);
  setSelection(result.selection.start, result.selection.end);
}

defineExpose({
  applyFormatting,
  focusEditor,
});
</script>

<template>
  <section class="editor-panel">
    <div class="editor-panel__topbar">
      <p class="editor-panel__label">Draft editor</p>

      <div class="editor-panel__meta">
        <span>{{ lineCount }} lines</span>
        <span>{{ characterCount }} chars</span>
      </div>
    </div>

    <div class="editor-panel__body">
      <textarea
        ref="textareaRef"
        class="editor-panel__textarea"
        :value="modelValue"
        placeholder="Paste rough text here and shape it into clean markdown."
        spellcheck="true"
        @input="updateValue(($event.target as HTMLTextAreaElement).value)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.editor-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 0.8rem;
  min-height: 34rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.014), transparent 100%),
    var(--bg-elevated);
  box-shadow: var(--shadow-md);
}

.editor-panel__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.editor-panel__label {
  margin: 0;
  color: var(--text-muted);
  font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.editor-panel__meta {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;

  span {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: 0.38rem 0.7rem;
    border: 1px solid var(--border-soft);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.028);
    color: var(--text-soft);
    font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
    font-size: 0.74rem;
    letter-spacing: 0.02em;
  }
}

.editor-panel__body {
  min-height: 0;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: calc(var(--radius-lg) - 4px);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent 14%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), transparent 100%),
    var(--surface);
  overflow: hidden;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base);

  &:focus-within {
    border-color: var(--border-strong);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.045),
      0 0 0 3px rgba(255, 255, 255, 0.045);
  }
}

.editor-panel__textarea {
  width: 100%;
  height: 100%;
  min-height: 100%;
  border: 0;
  background: transparent;
  color: var(--text);
  padding: 1rem 1.05rem;
  line-height: 1.72;
  outline: none;

  &::placeholder {
    color: #7e858d;
  }
}

@media (max-width: 720px) {
  .editor-panel {
    min-height: 27rem;
    padding: 0.9rem;
  }

  .editor-panel__topbar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
