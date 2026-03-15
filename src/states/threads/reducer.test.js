import { describe, it, expect } from 'vitest'
import threadsReducer from './reducer'

describe('threadsReducer', () => {
  it('harus mengembalikan thread baru ketika aksi addThread diberikan', () => {
    const initialState = [
      { id: 'thread-1', title: 'Judul 1' }
    ]
    const action = {
      type: 'threads/addThread',
      payload: { id: 'thread-2', title: 'Judul 2' }
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual([action.payload, ...initialState])
  })

  it('harus mengganti daftar thread ketika aksi receiveThreads diberikan', () => {
    const initialState = []
    const action = {
      type: 'threads/receiveThreads',
      payload: [{ id: 'thread-1', title: 'Judul 1' }]
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(action.payload)
  })
})
