import api from '../../../utils/api'
import { receiveLeaderboards } from './reducer'
import { showLoading, hideLoading } from '../ui/reducer'

export const asyncGetLeaderboards = () => async (dispatch) => {
  dispatch(showLoading())
  try {
    const leaderboards = await api.getLeaderboards()
    dispatch(receiveLeaderboards(leaderboards))
  } catch (error) {
    alert(error.message)
  } finally {
    dispatch(hideLoading())
  }
}
