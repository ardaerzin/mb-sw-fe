import request from 'lib/graph/Utils/request'
import { Character } from 'lib/graph/Queries'
import Cookies from 'universal-cookie'
import PropTypes from 'prop-types'

import { NextSeo } from 'next-seo'
import CharacterPageContent from 'Components/Character/Page'

const CharacterPage = ({ character, ...rest }) => {
  const { image, name } = character
  return (
    <div
      className='
        flex flex-col
        items-start justify-center
        max-w-md sm:max-w-lg md:max-w-3xl w-full
        mx-auto
        py-24 px-2 xl:px-0
        space-y-8
      '
    >
      <NextSeo
        title={name}
        description={`detailed bio & movie information of ${name}`}
        openGraph={{
          url: `https://www.url.ie/character/${character.id}`,
          title: name,
          description: `detailed bio & movie information of ${name}`,
          site_name: `StarWars Dex | ${name}`,
          images: [
            {
              url: image,
              width: 200,
              height: 200,
              alt: `${name} Alt`,
            }
          ]
        }}
      />
      <CharacterPageContent
        character={character}
      />
    </div>
  )
}

CharacterPage.propTypes = {
  character: PropTypes.object
}

export async function getServerSideProps({ query, req, res, ...rest }) {
  var header = req && req.headers && req.headers.cookie
  var uc = new Cookies(header)
  const { userToken } = uc.getAll()

  if (!userToken) {
    res.writeHead(302, { Location: '/auth' });
    res.end()
  }

  const { id } = query
  const { person: character } = await request({
    query: Character,
    token: userToken,
    vars: {
      id
    }
  })
  return {
    props: {
      character
    }
  }
}

export default CharacterPage
