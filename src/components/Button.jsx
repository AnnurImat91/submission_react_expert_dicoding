import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100'
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100'
  }
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string
}

export default Button
