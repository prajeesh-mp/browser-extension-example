import { countKey, isMessage } from '../shared/messages'

// All listeners are registered at top level so they survive service worker restarts.

chrome.runtime.onInstalled.addListener(() => {
  // Open the side panel when the toolbar icon is clicked.
  void chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
})

chrome.runtime.onMessage.addListener((message: unknown, sender) => {
  // Only accept messages from our own extension's content scripts.
  if (sender.id !== chrome.runtime.id || !isMessage(message)) return
  const tabId = sender.tab?.id
  if (tabId === undefined) return

  void (async () => {
    const key = countKey(tabId)
    const data = await chrome.storage.session.get(key)
    await chrome.storage.session.set({ [key]: ((data[key] as number | undefined) ?? 0) + 1 })
  })()
})

// Clean up counters when tabs close.
chrome.tabs.onRemoved.addListener((tabId) => void chrome.storage.session.remove(countKey(tabId)))
