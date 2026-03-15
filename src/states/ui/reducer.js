import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { loadingCount: 0 },
  reducers: {
    showLoading: (state) => { state.loadingCount += 1 },
    hideLoading: (state) => { state.loadingCount = Math.max(0, state.loadingCount - 1) }
  }
})

export const { showLoading, hideLoading } = uiSlice.actions
export default uiSlice.reducer
