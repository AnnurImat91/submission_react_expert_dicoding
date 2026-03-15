import React from 'react'
import PropTypes from 'prop-types'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

const VoteButtons = ({ upVotes, downVotes, onVote, authUserId }) => {
  const isUpvoted = authUserId ? upVotes.includes(authUserId) : false
  const isDownvoted = authUserId ? downVotes.includes(authUserId) : false

  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white">
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onVote(isUpvoted ? 0 : 1) }}
        className={`p-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors ${isUpvoted ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:bg-gray-50'}`}
      >
        <ThumbsUp size={14} className={isUpvoted ? 'fill-gray-900' : ''} />
        <span>{upVotes.length}</span>
      </button>
      <div className="w-px h-3 bg-gray-200 mx-1"></div>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onVote(isDownvoted ? 0 : -1) }}
        className={`p-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors ${isDownvoted ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:bg-gray-50'}`}
      >
        <ThumbsDown size={14} className={isDownvoted ? 'fill-gray-900' : ''} />
        <span>{downVotes.length}</span>
      </button>
    </div>
  )
}

VoteButtons.propTypes = {
  upVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string
}

export default VoteButtons
