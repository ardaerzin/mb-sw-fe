import { m as motion } from 'framer-motion'
import classnames from 'classnames'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Button = forwardRef(({ onClick, loading = false, disabled = false, color = '#00f', className, ...rest }, ref) => {
  return (
    <motion.button
      ref={ref}
      href='/'
      onClick={(e) => {
        if (loading) {
          e.preventDefault?.()
          return
        }
        onClick?.(e)
      }}
      className={classnames(`
        shadow
        flex
        py-3 md:py-2
        px-8 md:px-8
        items-center justify-center
        rounded-md
        relative
        border border-transparent
        font-display font-medium
        text-base text-white md:text-lg
      `, className)}
      whileHover='hover'
      disabled={disabled}
      animate={disabled ? 'disabled' : 'normal'}
      variants={{
        disabled: {
          opacity: 0.5,
          boxShadow: `0 0 0 0px ${color}`
        },
        normal: {
          opacity: 1,
          boxShadow: `0 0 0 0px ${color}`
        },
        hover: {
          opacity: 1,
          boxShadow: `0 0 0 2px ${color}`
        }
      }}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 0 0px ${color}`
      }}
      {...rest}
    />
  )
})

Button.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  hint: PropTypes.number
}

export default Button
