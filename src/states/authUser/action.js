import api from '../../../utils/api'
import { setAuthUser, unsetAuthUser } from './reducer'
import { showLoading, hideLoading } from '../ui/reducer'

export const asyncLoginUser = ({ email, password }, navigate) => async (dispatch) => {
  dispatch(showLoading())
  try {
    const token = await api.login({ email, password })
    api.putAccessToken(token)
    const authUser = await api.getOwnProfile()
    dispatch(setAuthUser(authUser))
    navigate('/')
  } catch (error) {
    alert(error.message)
  } finally {
    dispatch(hideLoading())
  }
}

export const asyncRegisterUser = ({ name, email, password }, navigate) => async (dispatch) => {
  dispatch(showLoading())
  try {
    await api.register({ name, email, password })
    alert('BAM! Registrasi berhasil! Silakan masuk dengan akun barumu.')
    navigate('/login')
  } catch (error) {
    alert(error.message)
  } finally {
    dispatch(hideLoading())
  }
}

export const asyncLogoutUser = (navigate) => (dispatch) => {
  api.putAccessToken('')
  dispatch(unsetAuthUser())
  navigate('/login')
}
