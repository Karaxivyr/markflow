<script setup lang="ts">
import { computed } from "vue";
import type { PresetId, PresetOption } from "../../data/presetTemplates";

interface Props {
  options: PresetOption[];
  selectedPreset: PresetId;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  change: [presetId: PresetId];
  insertTemplate: [];
}>();

const activeOption = computed(() => {
  return (
    props.options.find((option) => option.id === props.selectedPreset) ??
    props.options[0]
  );
});
</script>

<template>
  <section class="preset-switcher">
    <div class="preset-switcher__top">
      <div class="preset-switcher__heading">
        <p class="preset-switcher__label">Preset</p>
        <h2>Writing mode</h2>
      </div>

      <button
        class="preset-switcher__button"
        type="button"
        @click="emit('insertTemplate')"
      >
        Load scaffold
      </button>
    </div>

    <div class="preset-switcher__segmented" aria-label="Preset mode switcher">
      <button
        v-for="option in options"
        :key="option.id"
        class="preset-switcher__segment"
        :class="{
          'preset-switcher__segment--active': option.id === selectedPreset,
        }"
        type="button"
        @click="emit('change', option.id)"
      >
        {{ option.label }}
      </button>
    </div>

    <p class="preset-switcher__description">
      {{ activeOption.description }}
    </p>
  </section>
</template>

<style scoped lang="scss">
.preset-switcher {
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

.preset-switcher__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.preset-switcher__heading {
  display: grid;
  gap: 0.15rem;

  h2 {
    margin: 0;
    font-size: clamp(1.1rem, 1.5vw, 1.55rem);
    font-weight: 600;
    letter-spacing: -0.02em;
  }
}

.preset-switcher__label {
  margin: 0;
  color: var(--text-muted);
  font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.preset-switcher__segmented {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.55rem;
  padding: 0.3rem;
  border: 1px solid var(--border-soft);
  border-radius: calc(var(--radius-lg) - 4px);
  background: rgba(255, 255, 255, 0.02);
}

.preset-switcher__segment,
.preset-switcher__button {
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

.preset-switcher__segment {
  min-height: 2.7rem;
  padding: 0.65rem 0.8rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.92rem;
  font-weight: 500;
}

.preset-switcher__segment--active {
  border-color: var(--border-strong);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.09),
    rgba(255, 255, 255, 0.035)
  );
  color: var(--accent-strong);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.045);
}

.preset-switcher__button {
  min-height: 2.35rem;
  padding: 0.55rem 0.9rem;
  white-space: nowrap;
}

.preset-switcher__description {
  min-height: 1.5rem;
  margin: 0;
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 1100px) {
  .preset-switcher__segmented {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .preset-switcher {
    padding: 0.9rem;
  }

  .preset-switcher__top {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 520px) {
  .preset-switcher__segmented {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .preset-switcher__button,
  .preset-switcher__segment {
    width: 100%;
  }
}
</style>
