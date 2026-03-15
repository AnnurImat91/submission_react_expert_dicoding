import { createSlice } from '@reduxjs/toolkit'

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
    addComment: (state, action) => {
      state.comments.unshift(action.payload)
    },
    toggleVoteThreadDetail: (state, action) => {
      const { userId, voteType } = action.payload
      const upVotesBy = state.upVotesBy.filter((id) => id !== userId)
      const downVotesBy = state.downVotesBy.filter((id) => id !== userId)
      if (voteType === 1) upVotesBy.push(userId)
      if (voteType === -1) downVotesBy.push(userId)
      state.upVotesBy = upVotesBy
      state.downVotesBy = downVotesBy
    },
    toggleVoteComment: (state, action) => {
      const { commentId, userId, voteType } = action.payload
      const comment = state.comments.find((c) => c.id === commentId)
      if (comment) {
        const upVotesBy = comment.upVotesBy.filter((id) => id !== userId)
        const downVotesBy = comment.downVotesBy.filter((id) => id !== userId)
        if (voteType === 1) upVotesBy.push(userId)
        if (voteType === -1) downVotesBy.push(userId)
        comment.upVotesBy = upVotesBy
        comment.downVotesBy = downVotesBy
      }
    }
  }
})

export const { receiveThreadDetail, clearThreadDetail, addComment, toggleVoteThreadDetail, toggleVoteComment } = threadDetailSlice.actions
export default threadDetailSlice.reducer
