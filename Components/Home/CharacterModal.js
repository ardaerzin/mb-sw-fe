import CharacterPageContent from 'Components/Character/Page'
import useGraphSWR from 'lib/graph/Utils/useGraphSWR'
import { AiFillCloseCircle } from 'react-icons/ai'
import { m as motion } from 'framer-motion'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

const CharacterModal = ({ initialData }) => {
  const router = useRouter()
  const { data: person, loading } = useGraphSWR({
    dataKey: 'person',
    id: router?.query?.id || 'abort'
  }, {
    initialData,
    revalidateOnMount: true
  })
  return (
    <motion.div
      className='
        w-screen h-screen fixed top-0 left-0 z-50 bg-black bg-opacity-20
        flex flex-col items-center justify-center
      '
      initial='initial'
      animate='enter'
      exit='initial'
      variants={{
        initial: { opacity: 0 },
        enter: { opacity: 1 }
      }}
      transition={{ duration: 0.2 }}
      onClick={() => router.push('/', undefined, { shallow: true })}
    >
      <motion.div
        className='
          bg-white relative w-11/12 h-5/6 rounded-lg shadow-lg
          max-w-2xl
          flex flex-col items-center justify-center
          overflow-y-scroll
          p-8
        '
        variants={{
          initial: { scale: 0 },
          enter: { scale: 1 }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <AiFillCloseCircle
          className='
            text-yellow-600 text-2xl
            cursor-pointer
            absolute top-4 right-4
          '
          onClick={() => router.push('/', undefined, { shallow: true })}
        />
        <div
          className='
            w-full h-full
            flex flex-col
            space-y-8
          '
        >
          {
            person && (
              <CharacterPageContent
                character={person}
              />
            )
          }
        </div>
      </motion.div>
    </motion.div>
  )
}

CharacterModal.propTypes = {

}

export default CharacterModal
