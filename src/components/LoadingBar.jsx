import React from 'react'
import { useSelector } from 'react-redux'

const LoadingBar = () => {
  const isLoading = useSelector((state) => state.ui.loadingCount > 0)
  if (!isLoading) return null
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div className="h-full bg-gray-900 animate-pulse w-full origin-left transition-transform duration-300"></div>
    </div>
  )
}

export default LoadingBar
