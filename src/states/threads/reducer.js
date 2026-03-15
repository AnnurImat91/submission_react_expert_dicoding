import { createSlice } from '@reduxjs/toolkit'

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => action.payload,
    addThread: (state, action) => [action.payload, ...state],
    toggleVoteThread: (state, action) => {
      const { threadId, userId, voteType } = action.payload
      return state.map((thread) => {
        if (thread.id !== threadId) return thread
        const upVotesBy = thread.upVotesBy.filter((id) => id !== userId)
        const downVotesBy = thread.downVotesBy.filter((id) => id !== userId)
        if (voteType === 1) upVotesBy.push(userId)
        if (voteType === -1) downVotesBy.push(userId)
        return { ...thread, upVotesBy, downVotesBy }
      })
    }
  }
})

export const { receiveThreads, addThread, toggleVoteThread } = threadsSlice.actions
export default threadsSlice.reducer
