/* global app */
import React from "react"
import PropTypes from "prop-types"

import { contentData } from "../i18n-data"

const GalleryIndexTabs = ({ groups, allImagesLabel }) => (
  <React.Fragment>
    <div className="row hidden-xs">
      <div className="col-xs-12">
        <ul className="tabs">
          <li>
            <a
              className="btn shuffle-btn shuffle-active"
              title={allImagesLabel}
              data-group="all"
              href=""
            >
              {allImagesLabel}
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
  groups: PropTypes.array,
  allImagesLabel: PropTypes.string.isRequired
}

class GalleryIndex extends React.Component {
  constructor(props) {
    super(props)

    const contentDataLoc = contentData[props.currentLanguage]
    const { strings } = contentDataLoc

    this.state = {
      allImagesLabel: strings["All images"]
    }
  }

  componentDidMount() {
    setTimeout(() => app.initGalleryShuffle("#gallery-shuffle"), 500)
  }

  render() {
    return this.GalleryIndexRender(this.props)
  }

  GalleryIndexRender({ groups, photos }) {
    return (
      <React.Fragment>
        {groups && groups.length >= 0 && (
          <div className="container-fluid gallery-index">
            <GalleryIndexTabs
              groups={groups}
              allImagesLabel={this.state.allImagesLabel}
            />
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
  }
}

GalleryIndex.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  groups: PropTypes.array,
  photos: PropTypes.array
}

export default GalleryIndex
