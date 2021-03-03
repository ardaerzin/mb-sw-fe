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
      id={id}
    >
      <div
        className='relative w-full self-start'
      >
        <div
          className='relative aspect-w-1 aspect-h-1'
        >
          <Image
            src={image}
            layout='fill'
          />
        </div>
        <div
          className='absolute top-0 left-0 right-0 bottom-0'
          style={{
            background: 'linear-gradient(0deg, #ffffff44 30%, #00000030 100%)'
          }}
        />
      </div>
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
