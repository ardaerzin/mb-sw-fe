import PropTypes from 'prop-types'
import ThumbnailBase, { ThumbnailCategoryTitle, ThumbnailTextHolder, ThumbnailTitle } from './Base'

const FilmItem = ({ title, episodeID, id }) => {
  return (
    <ThumbnailBase
      type='film'
      id={id}
    >
      <ThumbnailTextHolder>
        {
          episodeID && (
            <ThumbnailCategoryTitle>
              episode {episodeID}
            </ThumbnailCategoryTitle>
          )
        }
        <ThumbnailTitle>
          {title}
        </ThumbnailTitle>
      </ThumbnailTextHolder>
    </ThumbnailBase>
  )
}

FilmItem.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string
}

export default FilmItem
