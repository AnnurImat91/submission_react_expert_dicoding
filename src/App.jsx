import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPreloadProcess } from './states/isPreload/action'

import Navigation from './components/Navigation'
import LoadingBar from './components/LoadingBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DetailPage from './pages/DetailPage'
import CreateThreadPage from './pages/CreateThreadPage'
import LeaderboardPage from './pages/LeaderboardPage'

function App () {
  const isPreload = useSelector((state) => state.isPreload)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) return null

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <LoadingBar />
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 py-10 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/thread/:id" element={<DetailPage />} />
          <Route path="/new" element={<CreateThreadPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
