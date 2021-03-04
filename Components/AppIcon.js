import { FaEmpire, FaRebel } from 'react-icons/fa'
import { CgFormatSlash } from 'react-icons/cg'
import PropTypes from 'prop-types'

const AppIcon = ({ size = 1 }) => {
  return (
    <div className='flex items-center justify-center'>
      <FaRebel
        className={`text-${(size * 2) + 1}xl md:text-${(size+1) * 2}xl text-yellow-600`}
      />
      <CgFormatSlash
        className={`text-${(size * 2) + 1}xl md:text-${(size+1) * 2}}xl text-gray-500`}
      />
      <FaEmpire
        className={`text-${(size * 2) + 1}xl md:text-${(size+1) * 2}xl text-gray-700`}
      />
    </div>
  )
}

AppIcon.propTypes = {
  size: PropTypes.number
}

export default AppIcon
