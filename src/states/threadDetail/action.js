import api from '../../../utils/api.js'
import { receiveThreadDetail, clearThreadDetail, addComment, toggleVoteThreadDetail, toggleVoteComment } from './reducer'
import { toggleVoteThread } from '../threads/reducer'
import { showLoading, hideLoading } from '../ui/reducer'

export const asyncGetThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading())
  dispatch(clearThreadDetail())
  try {
    const detail = await api.getThreadDetail(threadId)
    dispatch(receiveThreadDetail(detail))
  } catch (error) {
    alert(error.message)
  } finally {
    dispatch(hideLoading())
  }
}

export const asyncAddComment = ({ threadId, content }) => async (dispatch) => {
  dispatch(showLoading())
  try {
    const comment = await api.createComment({ threadId, content })
    dispatch(addComment(comment))
  } catch (error) {
    alert(error.message)
  } finally {
    dispatch(hideLoading())
  }
}

export const asyncVoteThreadDetail = ({ threadId, voteType }) => async (dispatch, getState) => {
  const { authUser } = getState()
  if (!authUser) {
    alert('ZAP! Kamu harus login dulu buat voting!')
    return
  }
  dispatch(toggleVoteThreadDetail({ userId: authUser.id, voteType }))
  dispatch(toggleVoteThread({ threadId, userId: authUser.id, voteType }))

  try {
    await api.voteThread({ threadId, voteType })
  } catch (error) {
    alert(error.message)
  }
}

export const asyncVoteComment = ({ threadId, commentId, voteType }) => async (dispatch, getState) => {
  const { authUser } = getState()
  if (!authUser) {
    alert('ZAP! Kamu harus login dulu buat voting!')
    return
  }
  dispatch(toggleVoteComment({ commentId, userId: authUser.id, voteType }))

  try {
    await api.voteComment({ threadId, commentId, voteType })
  } catch (error) {
    alert(error.message)
  }
}
