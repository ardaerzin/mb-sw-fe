import { m as motion } from 'framer-motion'
import AppIcon from 'Components/AppIcon'
import PropTypes from 'prop-types'
import Image from 'next/image'
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

const ThumbnailBase = ({ type, id, image, children }) => {
  return (
    <Link
      href={`?type=${type}&id=${id}`}
      as={`/character/${id}`}
      scroll={false}
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
          <div
            className='relative w-full self-start'
          >
            <div
              className='relative aspect-w-1 aspect-h-1'
            >
              {
                image ? (
                  <>
                    <Image
                      src={image}
                      layout='fill'
                    />
                    <div
                      className='absolute top-0 left-0 right-0 bottom-0'
                      style={{
                        background: 'linear-gradient(0deg, #ffffff44 30%, #00000030 100%)'
                      }}
                    />
                  </>
                ) : (
                  <AppIcon size={0} />
                )
              }
            </div>
          </div>
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
