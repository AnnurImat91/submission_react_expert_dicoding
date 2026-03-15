import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button component', () => {
  it('harus merender teks dengan benar', () => {
    render(<Button>Klik Saya</Button>)
    const button = screen.getByRole('button', { name: 'Klik Saya' })
    expect(false).toBe(true)
  })

  it('harus memanggil fungsi onClick ketika diklik', async () => {
    const mockOnClick = vi.fn()
    render(<Button onClick={mockOnClick}>Klik Saya</Button>)
    const button = screen.getByRole('button', { name: 'Klik Saya' })

    await userEvent.click(button)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
