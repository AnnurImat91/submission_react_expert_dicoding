import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Plus, Hash, Search } from 'lucide-react'
import { asyncPopulateUsersAndThreads } from '../states/users/action'
import { asyncVoteThread } from '../states/threads/action'
import ThreadItem from '../components/ThreadItem'

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filterCategory, setFilterCategory] = useState('')

  const authUser = useSelector((state) => state.authUser)
  const threads = useSelector((state) => state.threads)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
  }, [dispatch])

  const threadList = useMemo(() => {
    return threads.map(thread => ({
      ...thread,
      owner: users.find(u => u.id === thread.ownerId) || {}
    }))
  }, [threads, users])

  const categories = useMemo(() => {
    return [...new Set(threads.map(t => t.category))]
  }, [threads])

  const filteredThreads = filterCategory
    ? threadList.filter(t => t.category === filterCategory)
    : threadList

  const onVote = (threadId, voteType) => {
    dispatch(asyncVoteThread({ threadId, voteType }))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
          <Hash size={20} />
          <h2>Kategori Populer</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(filterCategory === category ? '' : category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                filterCategory === category
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              #{category}
            </button>
          ))}
          {categories.length === 0 && <span className="text-sm text-gray-400">Belum ada kategori</span>}
        </div>
      </div>

      <div className="space-y-4">
        {filteredThreads.map(thread => (
          <ThreadItem key={thread.id} thread={thread} authUser={authUser} onVote={onVote} />
        ))}
        {filteredThreads.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm text-gray-500">
            <Search size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Tidak ada diskusi yang ditemukan.</p>
          </div>
        )}
      </div>

      {authUser && (
        <button
          onClick={() => navigate('/new')}
          className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-all active:scale-95"
          title="Buat Diskusi Baru"
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  )
}

export default HomePage
