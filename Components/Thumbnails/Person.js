import ThumbnailBase, { ThumbnailTextHolder, ThumbnailTitle } from './Base'
import PropTypes from 'prop-types'
import Image from 'next/image'

const PeopleItem = ({ name, image, id }) => {
  return (
    <ThumbnailBase
      type='character'
      id={id}
    >
      <div
        className='relative w-full'
      >
        <div
          className='relative aspect-w-1 aspect-h-1'
        >
          <Image
            src={image}
            layout='fill'
          />
        </div>
      </div>
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
