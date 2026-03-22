<script setup lang="ts">
interface Props {
  activePreset: string;
  characters: number;
  isEmpty: boolean;
  lastSavedLabel: string;
  words: number;
}

defineProps<Props>();
</script>

<template>
  <footer class="status-bar">
    <div class="status-bar__left">
      <span class="status-bar__item status-bar__item--strong">
        {{ isEmpty ? "Idle" : "Editing" }}
      </span>

      <span class="status-bar__divider" aria-hidden="true" />

      <span class="status-bar__item">
        {{ activePreset }}
      </span>
    </div>

    <div class="status-bar__right">
      <span class="status-bar__item">{{ characters }} chars</span>
      <span class="status-bar__item">{{ words }} words</span>
      <span class="status-bar__item">{{ lastSavedLabel }}</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.1rem;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent 100%),
    var(--surface-glass);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
}

.status-bar__left,
.status-bar__right {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 0;
}

.status-bar__right {
  justify-content: flex-end;
  flex-wrap: wrap;
}

.status-bar__item {
  color: var(--text-muted);
  font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.status-bar__item--strong {
  color: var(--text-soft);
}

.status-bar__divider {
  width: 1px;
  height: 0.9rem;
  background: rgba(255, 255, 255, 0.1);
  flex: 0 0 auto;
}

@media (max-width: 900px) {
  .status-bar {
    align-items: flex-start;
  }

  .status-bar__right {
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  .status-bar {
    padding-left: 0.9rem;
    padding-right: 0.9rem;
    flex-direction: column;
    align-items: stretch;
  }

  .status-bar__left,
  .status-bar__right {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

@media (max-width: 520px) {
  .status-bar__divider {
    display: none;
  }
}
</style>
