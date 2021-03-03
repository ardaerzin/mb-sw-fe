import { m as motion } from 'framer-motion'
import classnames from 'classnames'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Button = forwardRef(({ disabled = false, color = '#00f', className, ...rest }, ref) => {
  return (
    <motion.button
      ref={ref}
      href='/'
      className={classnames(`
        shadow
        flex
        py-3 md:py-2
        px-8 md:px-8
        items-center justify-center
        rounded-md
        border border-transparent
        font-display font-medium
        text-base text-white md:text-lg
      `, className)}
      whileHover='hover'
      initial='initial'
      animate={disabled ? 'disabled' : 'initial'}
      variants={{
        disabled: {
          opacity: 0.5
        },
        initial: {
          opacity: 1,
          backgroundColor: color,
          boxShadow: `0 0 0 0px ${color}`
        },
        hover: {
          opacity: 1,
          boxShadow: `0 0 0 2px ${color}`
        }
      }}
      disabled={disabled}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 400
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
