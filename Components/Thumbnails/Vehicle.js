import PropTypes from 'prop-types'
import ThumbnailBase, { ThumbnailTextHolder, ThumbnailTitle } from './Base'

const VehicleItem = ({ name, model, id }) => {
  return (
    <ThumbnailBase
      type='vehicle'
      id={id}
    >
      <ThumbnailTextHolder>
        <ThumbnailTitle>
          {name}
        </ThumbnailTitle>
      </ThumbnailTextHolder>
    </ThumbnailBase>
  )
}

VehicleItem.propTypes = {
  name: PropTypes.string,
  model: PropTypes.string,
  id: PropTypes.string
}

export default VehicleItem
