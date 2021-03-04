import { AnimateSharedLayout, m as motion } from 'framer-motion'
import useSearch from 'lib/hooks/useSearch'
import Image from 'next/image'
import Link from 'next/link'

const SearchResultItem = (props) => {
  return (
    <Link
      href={`/character/${props.id}`}
    >
      <motion.a
        layout
        layoutId={`search-item-${props.id}`}
        className='w-full flex space-x-1 items-center bg-white shadow-md rounded-md cursor-pointer'
      >
        <div className='w-12 h-12 rounded-small shadow-md relative overflow-hidden'>
          <Image
            src={props.image}
            layout='fill'
          />
        </div>
        <span className='text-lg'>
          {props.name}
        </span>
      </motion.a>
    </Link>
  )
}

const SearchResults = ({ text }) => {
  const { people = [], loading } = useSearch()
  return (
    <motion.div
      className='
        fixed left-0 top-14
        flex
        justify-center
        w-full
        pb-2
        z-20
      '
      exit='exit'
      animate='enter'
      initial='initial'
      variants={{
        exit: { height: '0' },
        initial: { height: '0' },
        enter: { height: '300px' }
      }}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 400
      }}
    >
      <motion.div
        className='
          flex flex-col
          overflow-y-scroll
          items-end
          max-w-screen-xl
          mx-auto
          mr-2 md:mr-8 xl:mr-auto
          w-full
        '
      >
        <AnimateSharedLayout>
          <div
            className='
              flex flex-col
              overflow-y-scroll
              space-y-2
              w-max
            '
          >
            {
              people.map((pi) => (
                <SearchResultItem
                  key={`search-result-${pi.id}`}
                  {...pi}
                />
              ))
            }
          </div>
        </AnimateSharedLayout>
      </motion.div>
    </motion.div>
  )
}

SearchResults.propTypes = {

}

export default SearchResults
