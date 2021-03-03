import PropTypes from 'prop-types'
import ThumbnailBase, { ThumbnailTitle, ThumbnailCategoryTitle, ThumbnailTextHolder } from './Base'

const ShipItem = ({ name, model, id }) => {
  return (
    <ThumbnailBase
      type='ship'
      id={id}
    >
      <ThumbnailTextHolder>
        <ThumbnailCategoryTitle>
          {model}
        </ThumbnailCategoryTitle>
        <ThumbnailTitle>
          {name}
        </ThumbnailTitle>
      </ThumbnailTextHolder>
    </ThumbnailBase>
  )
}

ShipItem.propTypes = {
  name: PropTypes.string,
  model: PropTypes.string,
  id: PropTypes.string
}

export default ShipItem
