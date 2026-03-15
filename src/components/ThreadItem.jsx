import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Clock, MessageSquare } from 'lucide-react'
import { postedAt, stripHtml } from '../../utils/index.js'
import VoteButtons from './VoteButtons'

const ThreadItem = ({ thread, authUser, onVote }) => {
  return (
    <Link to={`/thread/${thread.id}`} className="block bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg mb-2">
          #{thread.category}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={14} /> {postedAt(thread.createdAt)}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
        {thread.title}
      </h3>

      <p className="text-gray-600 line-clamp-2 text-sm mb-4 leading-relaxed">
        {stripHtml(thread.body)}
      </p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
        <div className="flex items-center gap-4">
          <VoteButtons
            upVotes={thread.upVotesBy}
            downVotes={thread.downVotesBy}
            authUserId={authUser?.id}
            onVote={(voteType) => onVote(thread.id, voteType)}
          />
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MessageSquare size={16} />
            <span>{thread.totalComments} balasan</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{thread.owner.name}</span>
          <img src={thread.owner.avatar} alt={thread.owner.name} className="w-8 h-8 rounded-full bg-gray-200 object-cover" />
        </div>
      </div>
    </Link>
  )
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  onVote: PropTypes.func.isRequired
}

export default ThreadItem
