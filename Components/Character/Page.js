import CharacterInfoSheet from 'Components/Character/InfoSheet'
import CharacterSection from 'Components/Character/Section'
import CharacterItemListSection from 'Components/Character/ListSection'
import Image from 'next/image'

import FilmItem from 'Components/Thumbnails/Film'
import VehicleItem from 'Components/Thumbnails/Vehicle'
import ShipItem from 'Components/Thumbnails/Ships'

const CharacterPageContent = ({ character }) => {
  return (
    <>
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
            src={character.image}
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
    </>
  )
}

export default CharacterPageContent
