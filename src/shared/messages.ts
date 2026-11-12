// Type-only module: safe to import from content scripts (no runtime code).
export type ClickMessage = { type: 'click' }
export type Message = ClickMessage

export function isMessage(value: unknown): value is Message {
  return typeof value === 'object' && value !== null && (value as { type?: unknown }).type === 'click'
}

export const COUNT_KEY_PREFIX = 'clicks:'
export const countKey = (tabId: number) => `${COUNT_KEY_PREFIX}${tabId}`

