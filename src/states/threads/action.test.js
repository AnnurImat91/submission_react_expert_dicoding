import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import { asyncAddThread } from './action'
import api from '../../../utils/api'

vi.mock('../../../utils/api')

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api.createThread = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('harus mendispatch aksi addThread dan navigasi ketika berhasil', async () => {
    // arrange
    const fakeThread = { id: 'thread-1', title: 'Test', body: 'Body', category: 'test' }
    api.createThread.mockResolvedValue(fakeThread)
    const dispatch = vi.fn()
    const navigate = vi.fn()

    // action
    await asyncAddThread({ title: 'Test', body: 'Body', category: 'test' }, navigate)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/')
  })
})
