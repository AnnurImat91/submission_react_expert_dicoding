import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { asyncAddThread } from '../states/threads/action'
import Button from '../components/Button'

const CreateThreadPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(asyncAddThread({ title, category, body }, navigate))
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 w-fit">
        <ArrowLeft size={18} />
        <span className="font-medium">Kembali</span>
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-8">Buat Diskusi Baru</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Judul Diskusi</label>
          <input
            type="text" value={title} onChange={e => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
            placeholder="Apa yang ingin Anda diskusikan?" required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Kategori (Opsional)</label>
          <input
            type="text" value={category} onChange={e => setCategory(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
            placeholder="Contoh: react, javascript"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Isi Diskusi</label>
          <textarea
            value={body} onChange={e => setBody(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all min-h-[200px] resize-y text-sm leading-relaxed"
            placeholder="Tuliskan detail permasalahan atau topik Anda di sini..." required
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit" className="w-full sm:w-auto px-8">Bagikan Diskusi</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateThreadPage
