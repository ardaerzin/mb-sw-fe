import PropTypes from 'prop-types'
import CharacterSection, { CharacterSectionHeader } from './Section'
import { cloneElement } from 'react'

const CharacterItemListSection = ({ children, keyValue, label, character = {}}) => {
  const { name } = character
  const items = character[keyValue] || []
  return (
    <CharacterSection className='flex-col space-x-1 space-y-1'>
      <CharacterSectionHeader>
        <span className='text-purple-500'>{items.length}</span> {label}
      </CharacterSectionHeader>
      {
        items.length > 0 ? (
          <div className='pt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
            {items.map((fi, i) => (
              cloneElement(children, {
                key: `character-${keyValue}-${fi.id}`,
                ...fi
              })
            ))}
          </div>
        ) : (
          <span className='ml-2'>
            this character does not have any <b>{keyValue}</b> information
          </span>
        )
      }
    </CharacterSection>
  )
}

CharacterItemListSection.propTypes = {
  character: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired
}

export default CharacterItemListSection
