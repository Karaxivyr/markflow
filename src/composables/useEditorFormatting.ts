export interface SelectionState {
  start: number
  end: number
}

export interface FormatResult {
  value: string
  selection: SelectionState
}

function normalizeSelection(selection: SelectionState): SelectionState {
  return {
    start: Math.max(0, selection.start),
    end: Math.max(0, selection.end)
  }
}

function wrapSelection(
  value: string,
  selection: SelectionState,
  before: string,
  after = before,
  placeholder = 'text'
): FormatResult {
  const range = normalizeSelection(selection)
  const selectedText = value.slice(range.start, range.end) || placeholder
  const nextValue = `${value.slice(0, range.start)}${before}${selectedText}${after}${value.slice(range.end)}`
  const start = range.start + before.length
  const end = start + selectedText.length

  return {
    value: nextValue,
    selection: { start, end }
  }
}

function prefixLines(
  value: string,
  selection: SelectionState,
  prefix: string,
  fallback = 'Item'
): FormatResult {
  const range = normalizeSelection(selection)
  const lineStart = value.lastIndexOf('\n', Math.max(0, range.start - 1)) + 1
  const lineEndIndex = value.indexOf('\n', range.end)
  const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex
  const selectedBlock = value.slice(lineStart, lineEnd) || fallback
  const lines = selectedBlock.split('\n').map((line) => `${prefix}${line || fallback}`)
  const nextBlock = lines.join('\n')
  const nextValue = `${value.slice(0, lineStart)}${nextBlock}${value.slice(lineEnd)}`

  return {
    value: nextValue,
    selection: {
      start: lineStart,
      end: lineStart + nextBlock.length
    }
  }
}

function insertBlock(
  value: string,
  selection: SelectionState,
  block: string,
  cursorOffset?: number
): FormatResult {
  const range = normalizeSelection(selection)
  const nextValue = `${value.slice(0, range.start)}${block}${value.slice(range.end)}`
  const cursor = range.start + (cursorOffset ?? block.length)

  return {
    value: nextValue,
    selection: {
      start: cursor,
      end: cursor
    }
  }
}

export function useEditorFormatting() {
  function applyHeading(value: string, selection: SelectionState) {
    return prefixLines(value, selection, '# ', 'Heading')
  }

  function applyBold(value: string, selection: SelectionState) {
    return wrapSelection(value, selection, '**', '**', 'bold text')
  }

  function applyItalic(value: string, selection: SelectionState) {
    return wrapSelection(value, selection, '*', '*', 'italic text')
  }

  function applyBulletList(value: string, selection: SelectionState) {
    return prefixLines(value, selection, '- ', 'List item')
  }

  function applyQuote(value: string, selection: SelectionState) {
    return prefixLines(value, selection, '> ', 'Quoted text')
  }

  function applyCodeBlock(value: string, selection: SelectionState) {
    const selected = value.slice(selection.start, selection.end).trim() || 'code goes here'
    const block = `\n\`\`\`\n${selected}\n\`\`\`\n`
    const cursorOffset = block.length - 5 - selected.length

    return insertBlock(value, selection, block, cursorOffset)
  }

  function applyLink(value: string, selection: SelectionState) {
    return wrapSelection(value, selection, '[', '](https://example.com)', 'link text')
  }

  return {
    applyBold,
    applyBulletList,
    applyCodeBlock,
    applyHeading,
    applyItalic,
    applyLink,
    applyQuote
  }
}
