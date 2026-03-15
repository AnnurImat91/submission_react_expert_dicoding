import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import { asyncLoginUser } from './action'
import api from '../../../utils/api'

vi.mock('../../../utils/api')

describe('asyncLoginUser thunk', () => {
  beforeEach(() => {
    api.login = vi.fn()
    api.putAccessToken = vi.fn()
    api.getOwnProfile = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('harus mendispatch aksi dan memanggil navigasi ketika login berhasil', async () => {
    // arrange
    const fakeToken = 'fake-token'
    const fakeUser = { id: 'user-1', name: 'John' }
    api.login.mockResolvedValue(fakeToken)
    api.getOwnProfile.mockResolvedValue(fakeUser)
    const dispatch = vi.fn()
    const navigate = vi.fn()

    // action
    await asyncLoginUser({ email: 'test@test.com', password: 'password' }, navigate)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalled() 
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken)
    expect(navigate).toHaveBeenCalledWith('/')
  })
})