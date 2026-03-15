import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Award } from 'lucide-react'
import { asyncGetLeaderboards } from '../states/leaderboards/action'

const LeaderboardPage = () => {
  const dispatch = useDispatch()
  const leaderboards = useSelector(state => state.leaderboards)

  useEffect(() => {
    dispatch(asyncGetLeaderboards())
  }, [dispatch])

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gray-100 text-gray-900 rounded-xl">
            <Award size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
            <p className="text-gray-500 text-sm mt-1">Peringkat berdasarkan keaktifan diskusi dan komentar</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="w-16">Rank</div>
            <div className="flex-1">Pengguna</div>
            <div className="w-24 text-right">Skor</div>
          </div>
          <div className="divide-y divide-gray-100 bg-white">
            {leaderboards.map((item, index) => (
              <div key={item.user.id} className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-16 text-sm font-medium text-gray-400">
                  #{index + 1}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full bg-gray-200" />
                  <span className="text-sm font-semibold text-gray-900">{item.user.name}</span>
                </div>
                <div className="w-24 text-right text-sm font-bold text-gray-900">
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
