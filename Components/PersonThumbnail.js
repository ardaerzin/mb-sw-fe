import PropTypes from 'prop-types'
import Image from 'next/image'

const PeopleItem = ({ name, image, id }) => {
  return (
    <div
      className='
        flex flex-col
        bg-white rounded-md shadow-md
        overflow-hidden
      '
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
      <div
        className='px-4 my-2'
      >
        <span className='font-bold text-lg'>
          {name}
        </span>
      </div>
    </div>
  )
}

PeopleItem.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string
}

export default PeopleItem
