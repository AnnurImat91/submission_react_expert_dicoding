import api from '../../../utils/api.js'
import { addThread, toggleVoteThread } from './reducer'
import { showLoading, hideLoading } from '../ui/reducer'

export const asyncAddThread = ({ title, body, category }, navigate) => async (dispatch) => {
  dispatch(showLoading())
  try {
    const thread = await api.createThread({ title, body, category })
    dispatch(addThread(thread))
    navigate('/')
  } catch (error) {
    alert(error.message)
  } finally {
    dispatch(hideLoading())
  }
}

export const asyncVoteThread = ({ threadId, voteType }) => async (dispatch, getState) => {
  const { authUser } = getState()
  if (!authUser) {
    alert('ZAP! Kamu harus login dulu buat voting!')
    return
  }

  dispatch(toggleVoteThread({ threadId, userId: authUser.id, voteType }))

  try {
    await api.voteThread({ threadId, voteType })
  } catch (error) {
    alert(error.message)
  }
}
