import { useLocalStorage } from '@rehooks/local-storage';
import PropTypes from 'prop-types'
import { AnimateSharedLayout } from 'framer-motion'
import PeopleItem from 'Components/Thumbnails/Person'

const UserFavorites = ({ people }) => {
  const [likes = []] = useLocalStorage('userLikes')
  const favs = likes.map((li) => {
    return people.filter((pi) => pi.id === li)[0]
  })

  return (
    <>
      <span className='text-3xl self-start mx-auto md:mx-0'>
        your fav characters
      </span>
      <AnimateSharedLayout>
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
      </AnimateSharedLayout>
    </>
  )
}

UserFavorites.propTypes = {

}

export default UserFavorites
