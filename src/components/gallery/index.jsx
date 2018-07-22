import React from "react"
import PropTypes from "prop-types"

const Gallery = ({ heading, photos }) => (
  <React.Fragment>
    {photos &&
      photos.length > 0 && (
        <div className="col-xs-12">
          <h2>{heading}</h2>
          <ul className="gallery text-left">
            {photos.map(m => (
              <li key={m.imgslide_id}>
                <a
                  href={m.imgslide_path}
                  rel="group"
                  className="fancybox"
                  title={m.imgslide_caption}
                >
                  <img
                    src={m.srcThumb}
                    alt={m.caption_heading}
                    title={m.imgslide_caption}
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="clearfix" />
        </div>
      )}
  </React.Fragment>
)

Gallery.propTypes = {
  heading: PropTypes.string,
  photos: PropTypes.array
}

export default Gallery
