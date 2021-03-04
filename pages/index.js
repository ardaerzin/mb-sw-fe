import PeopleItem from 'Components/Thumbnails/Person'
import { AllPeople } from 'lib/graph/Queries'
import request from 'lib/graph/Utils/request'
import Cookies from 'universal-cookie'
import { NextSeo } from 'next-seo'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import useSearch from 'lib/hooks/useSearch'
import dynamic from 'next/dynamic'
import { CharacterSectionHeader } from 'Components/Character/Section'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CharacterModal = dynamic(() => import('Components/Home/CharacterModal'), { ssr: false })
const UserFavorites = dynamic(() => import('Components/Home/UserFavorites'), { ssr: false })

const Home = (props) => {
  const { people, loading } = useSearch(props.people)
  const [selected, setSelected] = useState()
  const router = useRouter()

  useEffect(() => {
    // use route change start event to speed up modal opening
    const handleRouteChangeStart = (url) => {
      
      // selected person is undefined if we are going back to the list
      if (url === '/') {
        setSelected(undefined)
        return
      }

      // url: /character/id
      let parts = url.split('/')
      if (parts[1] === 'character' && parts[2]) {
        // find the selected person and set state so we pass it to the modal
        setSelected(people.filter((di) => di.id === parts[2])[0])
      }
    }

    //subscribe to routechange start event
    router.events.on('routeChangeStart', handleRouteChangeStart)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])

  return (
    <div
      className='
        flex flex-col
        items-center justify-center
        max-w-screen-xl
        mx-auto
        py-24 sm:px-2 xl:px-0
        space-y-8
      '
    >
      <NextSeo
        title="All Characters"
        description="List of all characters in Star Wars movies"
        openGraph={{
          url: 'https://www.url.ie/a',
          title: 'All Characters',
          description: 'List of all characters in Star Wars movies',
          site_name: 'StarWars Dex',
        }}
      />
      <AnimatePresence>
        {
          selected && (
            <CharacterModal initialData={selected} />
          )
        }
      </AnimatePresence>
      <UserFavorites people={people} />
      {
        people.length > 0 ? (
          <>
            <div className='border-b-2 border-yellow-600'>
              <CharacterSectionHeader>
                found {people.length} characters
              </CharacterSectionHeader>
            </div>
            <AnimateSharedLayout>
              <div
                className='
                  w-full
                  grid grid-cols-2 sm:lg:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4
                  max-w-6xl
                  p-4
                '
              >
                {people.map((pi) => (
                  <PeopleItem
                    key={`sw-people-item-${pi.id}`}
                    {...pi}
                  />
                ))}
              </div>  
            </AnimateSharedLayout>
          </>
        ) : (
          <span>
            no characters were found. please try with a different name
          </span>
        )
      }
    </div>
  )
}

export async function getServerSideProps({ query, req, res, ...rest }) {

  /**
   * redirect user to login if no tokens are found
   */
  var header = req && req.headers && req.headers.cookie
  var uc = new Cookies(header)
  const { userToken } = uc.getAll()
  if (!userToken) {
    res.writeHead(302, { Location: '/auth' });
    res.end()
  }

  const { allPeople } = await request({
    query: AllPeople,
    token: userToken
  })

  return {
    props: {
      people: allPeople
    }
  }
}

export default Home
