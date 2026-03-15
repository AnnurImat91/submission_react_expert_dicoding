import { describe, it, expect } from 'vitest'
import authUserReducer from './reducer'

describe('authUserReducer', () => {
  it('harus mengembalikan state awal jika aksi tidak diketahui', () => {
    const initialState = null
    const action = { type: 'UNKNOWN' }
    const nextState = authUserReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })

  it('harus mengembalikan authUser ketika aksi setAuthUser diberikan', () => {
    const initialState = null
    const action = {
      type: 'authUser/setAuthUser',
      payload: { id: 'user-1', name: 'John Doe' }
    }
    const nextState = authUserReducer(initialState, action)
    expect(nextState).toEqual(action.payload)
  })
})
