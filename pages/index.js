import PeopleItem from 'Components/PersonThumbnail.js'
import { BsFilterRight } from 'react-icons/bs'
import { AllPeople } from 'lib/graph/Queries'
import request from 'lib/graph/Utils/request'
import Cookies from 'universal-cookie'

const Home = ({ people }) => {
  return (
    <div
      className='
        flex flex-col
        items-center justify-center
        max-w-screen-xl
        mx-auto
        bg-red-300
        py-24
        space-y-8
      '
    >
      <div
        className='sticky z-50 top-0 w-full bg-white py-4 px-4 flex justify-between items-center'
      >
        <h1 className='text-4xl font-bold'>
          Star Wars Char Wiki
        </h1>
        <div className='flex flex-row items-center relative z-0'>
          <input
            type='text'
            placeholder='search here'
            className='
              border-0 border-b
              text-lg
              focus:outline-none focus:border-brand focus:ring-0
            '
          />
          <div
            className='w-10 h-10 p-1 rounded-full bg-purple-400 cursor-pointer flex justify-center items-center'
          >
            <BsFilterRight
              className='text-gray-50 text-2xl cursor-pointer'
            />
          </div>
        </div>
      </div>
      <div
        className='
          w-full
          grid grid-cols-5 gap-4
          max-w-6xl
          p-4
        '
      >
        {people.map(({ id, ...rest }) => (
          <PeopleItem
            key={`sw-people-item-${id}`}
            {...rest}
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
