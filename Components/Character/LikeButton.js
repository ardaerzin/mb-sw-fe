import PropTypes from 'prop-types'
import { AnimatePresence, m as motion } from 'framer-motion'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useCallback } from 'react'
import { useLocalStorage } from '@rehooks/local-storage';

const CharacterLikeButton = ({ id, size = 'xl', ...rest }) => {
  const [likes = []] = useLocalStorage('userLikes')
  
  /**
   * dislike action
   * removes id from local storage
   */
  let dislike = useCallback(async () => {
    const { writeStorage } = await import('@rehooks/local-storage')
    const ind = likes.indexOf(id)
    let x = [...likes]
    x.splice(ind, 1)
    writeStorage('userLikes', x)
  }, [likes])
  
  /**
   * dislike action
   * adds character id to local storage
   */
  let like = useCallback(async () => {
    const { writeStorage } = await import('@rehooks/local-storage')
    let x = [...likes]
    x.push(id)
    writeStorage('userLikes', x)
  }, [likes])

  // set liked true if id is found in local likes
  const liked = likes.indexOf(id) >= 0

  return (
    <div
      {...rest}
    >
      {
        (liked) && (
          <motion.div
            onClick={(e) => {
              e.stopPropagation()
              dislike(id)
            }}
            exit='exit'
            animate='enter'
            initial='exit'
            variants={{
              exit: { scale: 0 },
              enter: { scale: 1 }
            }}
          >
            <FaHeart
              className={`text-${size} text-red-500`}
            />
          </motion.div>
        )
      }
      
      {
        !(liked) && (
          <motion.div
            onClick={(e) => {
              e.stopPropagation()
              like(id)
            }}
            exit='exit'
            initial='exit'
            animate='enter'
            variants={{
              exit: { scale: 0 },
              enter: { scale: 1 }
            }}
          >
            <FaRegHeart
              className={`text-${size} text-red-500`}
            />
          </motion.div>
        )
      }
    </div>
  )
}

CharacterLikeButton.propTypes = {
  id: PropTypes.string.isRequired
}

export default CharacterLikeButton
