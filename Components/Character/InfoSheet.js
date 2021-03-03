import PropTypes from 'prop-types'
import { Fragment } from 'react'

const InfoTemp = [
  {
    label: 'birth',
    key: 'birthYear'
  },
  {
    label: 'gender',
    key: 'gender'
  },
  {
    label: 'height',
    key: 'height'
  },
  {
    label: 'mass',
    key: 'mass'
  },
  {
    label: 'eye',
    key: 'eyeColor'
  },
  {
    label: 'skin',
    key: 'skinColor'
  }
]

const Label = ({ index, ...rest }) => {
  return (
    <span
      className={`
        align-middle
        font-bold
        text-base
        py-1
        col-span-1 col-start-${(index % 2) + ((index % 2) + 1)} row-start-${(Math.floor(index / 2) * 2) + 1}
      `}
      {...rest}
    />
  )
}

const Val = ({ index, ...rest }) => {
  return (
    <div
      className={`
        col-span-1 col-start-${(index % 2) + ((index % 2) + 2)} row-start-${(Math.floor(index / 2) * 2) + 1}
        text-right text-base
        font-light align-middle
        flex items-center justify-end
        pr-4
      `}
    >
      <span {...rest} />
    </div>
  )
}

const CharacterInfoSheet = ({ character }) => {
  return (
    <div className='flex flex-col items-center md:items-start w-full'>
      {
        character.species && (
          <h2 className='text-xs text-white bg-red-500 py-1 px-2 rounded-full md:self-start'>
            {character.species?.name}
          </h2>
        )
      }
      <h1 className='text-4xl font-black text-center'>
        {character.name}
      </h1>
      {
        character.homeworld && (
          <span>
            {character.homeworld?.name}
          </span>
        )
      }
      <div className='grid auto-cols-auto gap-y-1 gap-x-1 mt-3 align-middle self-stretch w-full'>
        {
          InfoTemp.map((it, i) => (
            <Fragment key={`info-sheet-item-${i}`}>
              <Label index={i}>
                {it.label}
              </Label>
              <Val index={i}>
                {character[it.key]}
              </Val>
              {((i % 2) === 0) && (
                <div
                  className={`
                    w-full col-span-4 bg-red-500 h-px
                    row-start-${(Math.floor(i / 2) * 2) + 2}
                  `}
                />
              )}
            </Fragment>
          ))
        }
      </div>
    </div>
  )
}

CharacterInfoSheet.propTypes = {

}

export default CharacterInfoSheet
