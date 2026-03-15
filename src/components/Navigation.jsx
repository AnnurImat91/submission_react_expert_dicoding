import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MessageSquare, Award, LogOut } from 'lucide-react'
import { asyncLogoutUser } from '../states/authUser/action'
import Button from './Button'
import Logod from '../../public/logod.png'

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authUser)

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-transform">
            <div className="bg-gray-900 text-white rounded-lg">
              <img src={Logod} alt="Logo" className='w-10' />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              DicodingForum
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`font-semibold text-sm transition-colors ${isActive('/') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
              Threadsss
            </Link>
            <Link to="/leaderboard" className={`font-semibold text-sm transition-colors flex items-center gap-1 ${isActive('/leaderboard') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
              <Award size={16}/> Leaderboardddd
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {authUser
              ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700">
                  <img src={authUser.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
                  <span>{authUser.name}</span>
                </div>
                <button onClick={() => dispatch(asyncLogoutUser(navigate))} className="text-gray-400 hover:text-red-500 transition" title="Keluar">
                  <LogOut size={20} />
                </button>
              </div>
                )
              : (
              <Button onClick={() => navigate('/login')} className="text-sm px-5 py-1.5">Masuk</Button>
                )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-40">
        <Link to="/" className={`flex flex-col items-center p-2 rounded-lg ${isActive('/') ? 'text-gray-900' : 'text-gray-500'}`}>
          <MessageSquare size={24} />
          <span className="text-[10px] font-semibold mt-1">Threadsss</span>
        </Link>
        <Link to="/leaderboard" className={`flex flex-col items-center p-2 rounded-lg ${isActive('/leaderboard') ? 'text-gray-900' : 'text-gray-500'}`}>
          <Award size={24} />
          <span className="text-[10px] font-semibold mt-1">Leaderboardddd</span>
        </Link>
      </div>
    </>
  )
}

export default Navigation
