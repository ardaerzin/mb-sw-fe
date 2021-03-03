import classnames from 'classnames'

export const CharacterSectionHeader = props => (
  <h2 className='font-bold text-2xl' {...props} />
)

const CharacterSection = ({ className, ...rest }) => (
  <div className={classnames('flex w-full', className)} {...rest} />
)

export default CharacterSection
