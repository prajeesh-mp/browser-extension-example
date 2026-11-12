import { describe, expect, it } from 'vitest'
import { countKey, isMessage } from './messages'

describe('messages', () => {
  it('accepts valid messages', () => expect(isMessage({ type: 'click' })).toBe(true))
  it('rejects invalid messages', () => {
    expect(isMessage(null)).toBe(false)
    expect(isMessage({ type: 'x' })).toBe(false)
    expect(isMessage('click')).toBe(false)
  })
  it('builds count keys', () => expect(countKey(7)).toBe('clicks:7'))
})

