import { m as motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Link from 'next/link'

export const ThumbnailTextHolder = (props) => (
  <div className='px-2 md:px-4 my-2 flex flex-col' {...props} />
)

export const ThumbnailCategoryTitle = (props) => (
  <span className='font-bold text-sm leading-none' {...props} />
)

export const ThumbnailTitle = (props) => (
  <span className='font-semibold text-lg leading-none' {...props} />
)

const ThumbnailBase = ({ type, id, children }) => {
  return (
    <Link
      href={`/${type}/${id}`}
    >
      <motion.a
        layout
        className='cursor-pointer'
        variants={{
          exit: { opacity: 0 },
          enter: { opacity: 1 }
        }}
        transition={{
          duration: 0.3
        }}
      >
        <div
          className='
            relative
            flex flex-col
            bg-white rounded-md shadow-md
            overflow-hidden
            self-stretch
            h-full
          '
        >
          {
            children
          }
        </div>
      </motion.a>
    </Link>
  )
}

ThumbnailBase.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default ThumbnailBase
