import api from '../../../utils/api.js'
import { setIsPreload } from './reducer'
import { setAuthUser } from '../authUser/reducer'
import { showLoading, hideLoading } from '../ui/reducer'

export const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading())
  try {
    const authUser = await api.getOwnProfile()
    dispatch(setAuthUser(authUser))
  } catch {
    dispatch(setAuthUser(null))
    api.putAccessToken('')
  } finally {
    dispatch(setIsPreload(false))
    dispatch(hideLoading())
  }
}
