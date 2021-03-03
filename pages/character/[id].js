import request from 'lib/graph/Utils/request'
import { Character } from 'lib/graph/Queries'
import Image from 'next/image'
import Cookies from 'universal-cookie'
import PropTypes from 'prop-types'
import CharacterInfoSheet from 'Components/Character/InfoSheet'
import CharacterSection from 'Components/Character/Section'
import CharacterItemListSection from 'Components/Character/ListSection'

import FilmItem from 'Components/Thumbnails/Film'
import VehicleItem from 'Components/Thumbnails/Vehicle'
import ShipItem from 'Components/Thumbnails/Ships'

const CharacterPage = ({ character, ...rest }) => {
  const { image, name, species, vehicles, starships, films, homeworld } = character
  return (
    <div
      className='
        flex flex-col
        items-start justify-center
        max-w-md sm:max-w-lg md:max-w-3xl w-full
        mx-auto
        py-12 px-2 xl:px-0
        space-y-8
      '
    >
      <CharacterSection
        className='
          items-center justify-center
          flex-col md:flex-row
          md:space-x-6
          space-y-6 md:space-y-0
          mx-auto
        '
      >
        <div className='rounded-lg overflow-hidden flex md:self-start ring-4 ring-blue-500 shadow-lg'>
          <Image
            src={image}
            width={200}
            height={200}
          />
        </div>
        <CharacterInfoSheet character={character} />
      </CharacterSection>

      <CharacterItemListSection
        character={character}
        keyValue='films'
        label='films'
      >
        <FilmItem />
      </CharacterItemListSection>
      <CharacterItemListSection
        character={character}
        keyValue='vehicles'
        label='vehicles'
      >
        <VehicleItem />
      </CharacterItemListSection>
      <CharacterItemListSection
        character={character}
        keyValue='starships'
        label='ships'
      >
        <ShipItem />
      </CharacterItemListSection>
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
