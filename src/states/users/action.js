import api from '../../../utils/api'
import { receiveUsers } from './reducer'
import { receiveThreads } from '../threads/reducer'
import { showLoading, hideLoading } from '../ui/reducer'

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading())
  try {
    const [users, threads] = await Promise.all([api.getAllUsers(), api.getAllThreads()])
    dispatch(receiveUsers(users))
    dispatch(receiveThreads(threads))
  } catch (error) {
    alert(error.message)
  } finally {
    dispatch(hideLoading())
  }
}
