<script setup lang="ts">
interface Props {
  html: string;
}

defineProps<Props>();
</script>

<template>
  <section class="preview-panel">
    <div class="preview-panel__topbar">
      <p class="preview-panel__label">Preview</p>
      <span class="preview-panel__tag">Rendered locally</span>
    </div>

    <div class="preview-panel__surface">
      <div
        v-if="html.trim()"
        class="preview-panel__content markdown-body"
        v-html="html"
      />

      <div v-else class="preview-panel__empty">
        <p>No preview yet</p>
        <span>Start typing in the editor to render markdown here.</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.preview-panel {
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

.preview-panel__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.preview-panel__label {
  margin: 0;
  color: var(--text-muted);
  font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.preview-panel__tag {
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

.preview-panel__surface {
  min-height: 0;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: calc(var(--radius-lg) - 4px);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent 14%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), transparent 100%),
    var(--surface);
  overflow: hidden;
}

.preview-panel__content,
.preview-panel__empty {
  height: 100%;
  min-height: 100%;
  padding: 1rem 1.1rem;
  overflow: auto;
}

.preview-panel__empty {
  display: grid;
  align-content: start;
  gap: 0.35rem;

  p {
    margin: 0;
    color: var(--text-soft);
    font-size: 0.98rem;
    font-weight: 500;
  }

  span {
    color: var(--text-muted);
    line-height: 1.6;
  }
}

:deep(.markdown-body) {
  color: var(--text-soft);
  line-height: 1.72;
}

:deep(.markdown-body > :first-child) {
  margin-top: 0;
}

:deep(.markdown-body > :last-child) {
  margin-bottom: 0;
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4) {
  color: var(--text);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

:deep(.markdown-body h1) {
  font-size: 1.7rem;
  margin: 0 0 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

:deep(.markdown-body h2) {
  margin: 1.6rem 0 0.8rem;
  font-size: 1.22rem;
}

:deep(.markdown-body h3) {
  margin: 1.35rem 0 0.7rem;
  font-size: 1.02rem;
}

:deep(.markdown-body p),
:deep(.markdown-body ul),
:deep(.markdown-body ol),
:deep(.markdown-body blockquote),
:deep(.markdown-body pre) {
  margin: 0 0 1rem;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 1.15rem;
}

:deep(.markdown-body li + li) {
  margin-top: 0.3rem;
}

:deep(.markdown-body strong) {
  color: var(--text);
}

:deep(.markdown-body blockquote) {
  padding: 0.8rem 0.95rem;
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0 10px 10px 0;
  color: var(--text-soft);
}

:deep(.markdown-body code) {
  padding: 0.18rem 0.42rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.055);
  color: var(--accent);
  font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.92em;
}

:deep(.markdown-body pre) {
  padding: 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: #101215;
  overflow: auto;
}

:deep(.markdown-body pre code) {
  padding: 0;
  background: transparent;
  color: var(--text-soft);
}

:deep(.markdown-body a) {
  color: var(--accent);
  text-decoration: none;
}

:deep(.markdown-body a:hover) {
  color: var(--accent-strong);
}

@media (max-width: 720px) {
  .preview-panel {
    min-height: 27rem;
    padding: 0.9rem;
  }

  .preview-panel__topbar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
