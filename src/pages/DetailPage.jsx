import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MessageSquare, ArrowLeft } from 'lucide-react'
import {
  asyncGetThreadDetail,
  asyncAddComment,
  asyncVoteThreadDetail,
  asyncVoteComment
} from '../states/threadDetail/action'
import { showFormattedDate, postedAt } from '../../utils/index.js'
import VoteButtons from '../components/VoteButtons'
import Button from '../components/Button'
import parse from 'html-react-parser'

const DetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.threadDetail)
  const authUser = useSelector((state) => state.authUser)
  const [commentContent, setCommentContent] = useState('')

  useEffect(() => {
    dispatch(asyncGetThreadDetail(id))
  }, [dispatch, id])

  const onCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentContent.trim()) return
    dispatch(asyncAddComment({ threadId: id, content: commentContent }))
    setCommentContent('')
  }

  if (!detail) {
    return (
      <div className="text-center py-20 text-gray-500 text-sm">
        Memuat detail diskusi...
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-fit"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Kembali</span>
      </button>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={detail.owner.avatar}
            alt={detail.owner.name}
            className="w-10 h-10 rounded-full bg-gray-100"
          />
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              {detail.owner.name}
            </h4>
            <span className="text-xs text-gray-500">
              {showFormattedDate(detail.createdAt)}
            </span>
          </div>
          <span className="ml-auto inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">
            #{detail.category}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
          {detail.title}
        </h1>

        <div className="prose prose-gray prose-sm sm:prose-base max-w-none text-gray-700 mb-8 leading-relaxed">
          {parse(detail.body)}
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <VoteButtons
            upVotes={detail.upVotesBy}
            downVotes={detail.downVotesBy}
            authUserId={authUser?.id}
            onVote={(voteType) =>
              dispatch(asyncVoteThreadDetail({ threadId: detail.id, voteType }))
            }
          />
          <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
            <MessageSquare size={16} /> {detail.comments.length} Balasan
          </span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Tulis Balasan</h3>

        {authUser
          ? (
          <form onSubmit={onCommentSubmit} className="mb-8">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all min-h-[120px] resize-y text-sm"
              placeholder="Bagikan pemikiran Anda..."
              required
            />
            <div className="flex justify-end mt-3">
              <Button type="submit">Kirim Balasan</Button>
            </div>
          </form>
            )
          : (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center mb-8">
            <span className="block mb-4 text-sm text-gray-600">
              Anda harus masuk untuk meninggalkan balasan.
            </span>
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="mx-auto text-sm py-2"
            >
              Masuk ke Akun
            </Button>
          </div>
            )}

        <div className="space-y-6">
          {detail.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.owner.avatar}
                alt={comment.owner.name}
                className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0"
              />
              <div className="flex-1 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900 text-sm">
                    {comment.owner.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {postedAt(comment.createdAt)}
                  </span>
                </div>
                <div className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {parse(comment.content)}
                </div>
                <VoteButtons
                  upVotes={comment.upVotesBy}
                  downVotes={comment.downVotesBy}
                  authUserId={authUser?.id}
                  onVote={(voteType) =>
                    dispatch(
                      asyncVoteComment({
                        threadId: detail.id,
                        commentId: comment.id,
                        voteType
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
          {detail.comments.length === 0 && (
            <div className="text-center py-8 text-sm text-gray-400">
              Belum ada balasan. Jadilah yang pertama!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailPage
