import ThumbnailBase, { ThumbnailTextHolder, ThumbnailTitle } from './Base'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'

const CharacterLikeButton = dynamic(() => import('Components/Character/LikeButton'), { ssr: false })

const PeopleItem = ({ name, image, id, likeAction, dislikeAction, liked = false }) => {
  return (
    <ThumbnailBase
      type='character'
      image={image}
      id={id}
    >
      <CharacterLikeButton
        id={id}
        className='absolute top-2 right-2 z-10'
      />
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
