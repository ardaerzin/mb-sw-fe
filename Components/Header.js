import { useLocalStorage } from '@rehooks/local-storage'
import useSharedState from 'lib/hooks/useSharedState'
import { AiFillCloseCircle } from 'react-icons/ai'
import { AnimatePresence } from 'framer-motion'
import SearchResults from 'Components/Search'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import AppIcon from './AppIcon'
import Link from 'next/link'

const Header = props => {
  const [search, setSearch] = useSharedState('searchState', { text: undefined, status: false })
  const [user] = useLocalStorage('user')
  const router = useRouter()

  /**
   * reset search state after route change
   */
  useEffect(() => {
    const handleRouteChange = (url) => {
      setSearch({ text: undefined, status: false })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])


  /**
   * fire with changing search query
   * @param {*} event fired
   */
  const handleSearchChange = (e) => {
    setSearch({ text: e.target.value, status: e.target.value !== '' })
  }

  /**
   * reset search state
   */
  const resetSearch = () => {
    setSearch({ text: undefined, state: false })
  }

  return (
    <>
      <header
        className='
          fixed
          left-0
          top-0
          z-50
          w-full
          py-2 px-2 md:px-8 xl:px-0
          bg-white
          shadow-lg
        '
      >
        <div
          className='mx-auto max-w-screen-xl w-full flex justify-between'
        >
          <div className='flex items-center space-x-1'>
            <Link
              href='/'
            >
              <a>
                <AppIcon size={0} />
              </a>
            </Link>
            <span className='hidden md:block font-semibold text-lg text-yellow-600 pl-1'>
              StarWars Dex
            </span>
          </div>
          {
            user && (
              <div className='relative'>
                <input
                  type='text'
                  placeholder='search by name'
                  value={search.text || ''}
                  onChange={handleSearchChange}
                  className='
                    border-b
                    text-sm
                    rounded-lg
                    bg-transparent
                    focus:outline-none focus:border-brand focus:ring-0
                  '
                />
                <div
                  className='absolute right-0 top-0 h-full flex items-center pr-2 cursor-pointer'
                >
                  <AiFillCloseCircle
                    onClick={resetSearch}
                    className='text-red-500 text-lg'
                  />
                </div>
              </div>
            )
          }
        </div>
      </header>
      <AnimatePresence>
        {
          /**
           * do no show search results if we are on the index page
           */
          (router.pathname !== '/' && search.status) && (
            <SearchResults />
          )
        }
      </AnimatePresence>
    </>
  )
}

Header.propTypes = {

}

export default Header
