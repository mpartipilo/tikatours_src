/* global app */
import React from "react"
import PropTypes from "prop-types"

const GalleryIndexTabs = ({ groups }) => (
  <React.Fragment>
    <div className="row hidden-xs">
      <div className="col-xs-12">
        <ul className="tabs">
          <li>
            <a
              className="btn shuffle-btn shuffle-active"
              title="All gallery images"
              data-group="all"
              href=""
            >
              All images
            </a>
          </li>
          {groups.map(g => (
            <li key={g.imggrp_id}>
              <a
                className="btn shuffle-btn"
                title={g.imggrp_name + " gallery"}
                data-group={g.gallery_id}
                href=""
              >
                {g.imggrp_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </React.Fragment>
)

GalleryIndexTabs.propTypes = {
  groups: PropTypes.array
}

class GalleryIndex extends React.Component {
  componentDidMount() {
    setTimeout(() => app.initGalleryShuffle("#gallery-shuffle"), 500)
  }

  render() {
    return GalleryIndexRender(this.props)
  }
}

const GalleryIndexRender = ({ groups, photos }) => (
  <React.Fragment>
    {groups && groups.length >= 0 && (
      <div className="container-fluid gallery-index">
        <GalleryIndexTabs groups={groups} />
        <div className="row">
          <div className="col-xs-12">
            <ul id="gallery-shuffle" className="gallery">
              {photos &&
                photos.map(p => (
                  <li
                    key={p.imgslide_id}
                    className="gallery-item"
                    data-groups={`["all","${p.gallery_id}"]`}
                  >
                    <a
                      href={p.imgslide_path}
                      data-main-group={p.gallery_id}
                      data-fancybox-group="all"
                      className="fancybox"
                      title={p.imgslide_caption}
                    >
                      <img
                        src={p.srcThumb}
                        alt={p.imgslide_alt}
                        title={p.imgslide_caption}
                      />
                      {p.imgslide_caption && (
                        <span>
                          <p>{p.imgslide_caption}</p>
                        </span>
                      )}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </React.Fragment>
)

GalleryIndexRender.propTypes = {
  groups: PropTypes.array,
  photos: PropTypes.array
}

export default GalleryIndex
