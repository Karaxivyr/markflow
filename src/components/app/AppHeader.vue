<script setup lang="ts">
interface HeaderAction {
  label: string;
  tone?: "default" | "danger";
}

interface Props {
  actions: HeaderAction[];
  activePreset: string;
  lastSavedLabel: string;
}

defineProps<Props>();

const emit = defineEmits<{
  action: [label: string];
}>();
</script>

<template>
  <header class="app-header">
    <div class="app-header__identity">
      <div class="app-header__title-group">
        <h1>MarkFlow</h1>
        <p>Local markdown formatter</p>
      </div>
    </div>

    <div class="app-header__meta" aria-label="Current app status">
      <span class="app-header__meta-item">Mode · {{ activePreset }}</span>
      <span class="app-header__meta-item">{{ lastSavedLabel }}</span>
    </div>

    <div class="app-header__actions">
      <button
        v-for="action in actions"
        :key="action.label"
        class="app-header__button"
        :class="{ 'app-header__button--danger': action.tone === 'danger' }"
        type="button"
        @click="emit('action', action.label)"
      >
        {{ action.label }}
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 0.95rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent 100%),
    var(--surface-glass);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
}

.app-header__title-group {
  display: grid;
  gap: 0.15rem;

  h1 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  p {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.88rem;
    line-height: 1.3;
  }
}

.app-header__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.app-header__meta-item {
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

.app-header__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  justify-content: flex-end;
}

.app-header__button {
  min-height: 2.4rem;
  padding: 0.58rem 0.9rem;
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

.app-header__button--danger {
  border-color: rgba(255, 255, 255, 0.12);
  color: #f1e8eb;

  &:hover {
    border-color: rgba(255, 255, 255, 0.18);
    background: var(--danger-soft);
  }
}

@media (max-width: 900px) {
  .app-header {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .app-header__meta,
  .app-header__actions {
    justify-content: flex-start;
  }
}

@media (max-width: 520px) {
  .app-header__actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .app-header__button {
    width: 100%;
  }
}
</style>
