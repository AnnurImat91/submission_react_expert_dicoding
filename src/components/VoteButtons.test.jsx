import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VoteButtons from './VoteButtons'

describe('VoteButtons component', () => {
  it('harus memanggil onVote dengan argumen 1 ketika tombol upvote diklik', async () => {
    const mockOnVote = vi.fn()
    render(<VoteButtons upVotes={[]} downVotes={[]} onVote={mockOnVote} authUserId="user-1" />)

    // Tombol pertama adalah upvote
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])

    expect(mockOnVote).toHaveBeenCalledWith(1)
  })

  it('harus memanggil onVote dengan argumen -1 ketika tombol downvote diklik', async () => {
    const mockOnVote = vi.fn()
    render(<VoteButtons upVotes={[]} downVotes={[]} onVote={mockOnVote} authUserId="user-1" />)

    // Tombol kedua adalah downvote
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[1])

    expect(mockOnVote).toHaveBeenCalledWith(-1)
  })
})
