import type { Message } from '../shared/messages'

const message: Message = { type: 'click' }

window.addEventListener(
  'click',
  () => {
    chrome.runtime.sendMessage(message).catch(() => {
      // Extension was reloaded/service worker unavailable; ignore.
    })
  },
  { passive: true },
)

