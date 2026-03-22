import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { PresetId } from '../data/presetTemplates'

const STORAGE_KEY = 'markflow:draft'
const SAVE_DELAY = 220

interface StoredDraft {
  content: string
  preset: PresetId
  updatedAt: number
}

export function useLocalDraft(content: Ref<string>, preset: Ref<PresetId>) {
  const lastSavedAt = ref<number | null>(null)

  function loadDraft() {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return
    }

    try {
      const parsed = JSON.parse(raw) as StoredDraft

      content.value = parsed.content ?? ''
      preset.value = parsed.preset ?? 'markdown'
      lastSavedAt.value = parsed.updatedAt ?? null
    } catch (error) {
      console.warn('Unable to parse saved MarkFlow draft.', error)
    }
  }

  function saveDraft() {
    const payload: StoredDraft = {
      content: content.value,
      preset: preset.value,
      updatedAt: Date.now()
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    lastSavedAt.value = payload.updatedAt
  }

  function clearDraft() {
    window.localStorage.removeItem(STORAGE_KEY)
    lastSavedAt.value = null
  }

  let timeoutId: number | undefined

  watch([content, preset], () => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(saveDraft, SAVE_DELAY)
  })

  return {
    clearDraft,
    lastSavedAt,
    loadDraft,
    saveDraft
  }
}
