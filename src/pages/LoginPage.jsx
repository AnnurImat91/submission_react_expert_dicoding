import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import { asyncLoginUser } from '../states/authUser/action'
import Button from '../components/Button'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(state => state.authUser?.error) // Ambil error jika ada di state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(asyncLoginUser({ email, password }, navigate))
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-gray-100 text-gray-900 rounded-xl">
          <MessageSquare size={28} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Selamat Datang</h2>
      <p className="text-center text-gray-500 text-sm mb-8">Masuk ke akun Anda untuk melanjutkan</p>

      {error && <div className="p-3 mb-6 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Email</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
            placeholder="nama@email.com" required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Password</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
            placeholder="••••••••" required minLength="6"
          />
        </div>
        <Button type="submit" className="w-full py-3 mt-2">Masuk</Button>
      </form>
      <p className="mt-8 text-center text-gray-500 text-sm">
        Belum memiliki akun?{' '}
        <Link to="/register" className="text-gray-900 font-semibold cursor-pointer hover:underline underline-offset-4">
          Daftar
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
