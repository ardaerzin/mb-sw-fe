import { BsFilterRight } from 'react-icons/bs'
import { AllPeople } from 'lib/graph/Queries'
import request from 'lib/graph/Utils/request'
import Cookies from 'universal-cookie'
import PeopleItem from 'Components/Thumbnails/Person'

const Home = ({ people }) => {
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
    </div>
  )
}

export async function getServerSideProps({ query, req, res, ...rest }) {
  // console.log('get serverside props', req.headers.cookie)
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
