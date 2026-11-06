/**
 * Shares the current page with the Web Share API, or copies its link where that is not available
 * (design-notes G11). Resolves to what happened, for a status message; `cancelled` when the visitor
 * closes the share sheet.
 */
export async function sharePage(
  title: string,
): Promise<'shared' | 'copied' | 'cancelled' | 'failed'> {
  const url = window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title, url })
      return 'shared'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled'
    }
  }
  try {
    await navigator.clipboard.writeText(url)
    return 'copied'
  } catch {
    return 'failed'
  }
}
