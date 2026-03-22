<script setup lang="ts">
export type ToolbarAction =
  | "heading"
  | "bold"
  | "italic"
  | "bullet"
  | "quote"
  | "code"
  | "link";

interface ToolbarItem {
  id: ToolbarAction;
  keyLabel: string;
  textLabel: string;
}

const toolbarItems: ToolbarItem[] = [
  { id: "heading", keyLabel: "H1", textLabel: "Heading" },
  { id: "bold", keyLabel: "B", textLabel: "Bold" },
  { id: "italic", keyLabel: "I", textLabel: "Italic" },
  { id: "bullet", keyLabel: "•", textLabel: "List" },
  { id: "quote", keyLabel: "❝", textLabel: "Quote" },
  { id: "code", keyLabel: "{ }", textLabel: "Code" },
  { id: "link", keyLabel: "↗", textLabel: "Link" },
];

const emit = defineEmits<{
  action: [action: ToolbarAction];
}>();
</script>

<template>
  <section class="editor-toolbar">
    <div class="editor-toolbar__top">
      <div class="editor-toolbar__heading">
        <p class="editor-toolbar__label">Toolbar</p>
        <h2>Formatting</h2>
      </div>
    </div>

    <div class="editor-toolbar__actions" aria-label="Formatting toolbar">
      <button
        v-for="item in toolbarItems"
        :key="item.id"
        class="editor-toolbar__button"
        type="button"
        @click="emit('action', item.id)"
      >
        <span class="editor-toolbar__key">{{ item.keyLabel }}</span>
        <span class="editor-toolbar__text">{{ item.textLabel }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.editor-toolbar {
  display: grid;
  gap: 0.9rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.014), transparent 100%),
    var(--bg-elevated);
  box-shadow: var(--shadow-md);
}

.editor-toolbar__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.editor-toolbar__heading {
  display: grid;
  gap: 0.15rem;

  h2 {
    margin: 0;
    font-size: clamp(1.1rem, 1.5vw, 1.55rem);
    font-weight: 600;
    letter-spacing: -0.02em;
  }
}

.editor-toolbar__label {
  margin: 0;
  color: var(--text-muted);
  font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.editor-toolbar__actions {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.55rem;
  padding: 0.3rem;
  border: 1px solid var(--border-soft);
  border-radius: calc(var(--radius-lg) - 4px);
  background: rgba(255, 255, 255, 0.02);
}

.editor-toolbar__button {
  min-height: 2.7rem;
  padding: 0.55rem 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  text-align: center;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.028),
    rgba(255, 255, 255, 0)
  );
  color: var(--text-soft);
  cursor: pointer;
  transition:
    transform var(--transition-fast),
    border-color var(--transition-base),
    background-color var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    border-color: var(--border-strong);
    background-color: var(--surface-soft);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.025);
  }

  &:active {
    transform: translateY(1px);
  }
}

.editor-toolbar__key {
  font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent-strong);
  line-height: 1;
  white-space: nowrap;
}

.editor-toolbar__text {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1;
  white-space: nowrap;
}

@media (max-width: 1100px) {
  .editor-toolbar__actions {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .editor-toolbar {
    padding: 0.9rem;
  }

  .editor-toolbar__top {
    flex-direction: column;
    align-items: stretch;
  }

  .editor-toolbar__actions {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .editor-toolbar__actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .editor-toolbar__button {
    width: 100%;
  }
}
</style>
