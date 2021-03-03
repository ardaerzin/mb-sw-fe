import { useLocalStorage } from '@rehooks/local-storage';
import PropTypes from 'prop-types'
import { AnimateSharedLayout, m as motion } from 'framer-motion'
import PeopleItem from 'Components/Thumbnails/Person'
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa'

const UserFavorites = ({ people }) => {
  const [visible, setVisible] = useState(false)
  const [likes = []] = useLocalStorage('userLikes')
  const favs = likes.map((li) => {
    return people.filter((pi) => pi.id === li)[0]
  })

  return (
    <motion.div
      className='
        fixed
        right-4
        bottom-4 z-20
        p-4
        flex items-center justify-center
        cursor-pointer
        rounded-full
        overflow-hidden
        bg-yellow-600
      '
      initial='initial'
      animate={visible ? 'visible' : 'initial'}
      onClick={() => setVisible(!visible)}
      variants={{
        visible: {
          width: 'calc(100% - 2rem)',
          height: 'calc(100vh - 6rem)',
          borderRadius: '0px'
        },
        initial: {
          width: 'calc(0% + 4rem)',
          height: 'calc(0% + 4rem)',
          borderRadius: '28px'
        }
      }}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 400
      }}
    >
      {
        !visible && (
          <motion.div className='text-white font-black flex items-center justify-center space-x-1' layoutId='text' layout>
            <span>
              {favs.length}
            </span>
            <FaHeart className='text-base text-white' />
          </motion.div>
        )
      }

      {
        visible && (
          <div className='relative w-full h-full'>
            <motion.span className='text-white text-2xl' layoutId='text' layout>
              your favorite characters {favs.length}
            </motion.span>
            <div
              className='
                w-full
                grid grid-cols-2 sm:lg:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4
                max-w-6xl
                p-4
              '
            >
              {favs.map((pi) => (
                <PeopleItem
                  key={`sw-people-item-${pi.id}`}
                  {...pi}
                />
              ))}
            </div>  
          </div>
        )
      }
    </motion.div>
  )
}

UserFavorites.propTypes = {

}

export default UserFavorites
