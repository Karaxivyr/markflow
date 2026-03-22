import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true
})

export function useMarkdown() {
  function renderMarkdown(source: string): string {
    const value = source.trim()

    if (!value) {
      return '<p class="preview-empty">Start typing on the left to preview clean markdown here.</p>'
    }

    return markdown.render(source)
  }

  return {
    renderMarkdown
  }
}
