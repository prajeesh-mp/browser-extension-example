import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { countKey } from '../shared/messages'
import './style.css'

async function activeTabId(): Promise<number | undefined> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab?.id
}

function useClickCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let tabId: number | undefined
    const refresh = async () => {
      tabId = await activeTabId()
      if (tabId === undefined) return setCount(0)
      const key = countKey(tabId)
      const data = await chrome.storage.session.get(key)
      setCount((data[key] as number | undefined) ?? 0)
    }
    const onChanged = (changes: Record<string, chrome.storage.StorageChange>) => {
      if (tabId !== undefined && countKey(tabId) in changes) void refresh()
    }
    void refresh()
    chrome.storage.session.onChanged.addListener(onChanged)
    chrome.tabs.onActivated.addListener(refresh)
    return () => {
      chrome.storage.session.onChanged.removeListener(onChanged)
      chrome.tabs.onActivated.removeListener(refresh)
    }
  }, [])

  return count
}

function App() {
  const count = useClickCount()
  return <main class="counter">Clicks: {count ?? '…'}</main>
}

render(<App />, document.getElementById('root')!)

