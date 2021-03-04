import ThumbnailBase, { ThumbnailTextHolder, ThumbnailTitle } from './Base'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { AnimatePresence, m as motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const CharacterLikeButton = dynamic(() => import('Components/Character/LikeButton'), { ssr: false })

const PeopleItem = ({ name, image, id, likeAction, dislikeAction, liked = false }) => {
  return (
    <ThumbnailBase
      type='character'
      image={image}
      id={id}
    >
      <AnimatePresence
        exitBeforeEnter={true}
      >
        <CharacterLikeButton
          id={id}
          className='absolute top-2 right-2 z-10'
        />
      </AnimatePresence>
      <ThumbnailTextHolder>
        <ThumbnailTitle>
          {name}
        </ThumbnailTitle>
      </ThumbnailTextHolder>
    </ThumbnailBase>
  )
}

PeopleItem.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string
}

export default PeopleItem
