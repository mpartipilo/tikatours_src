import path from "path"
import React from "react"
import PropTypes from "prop-types"

import imageSlides from "../../../data/images_slides.json"

class HomeGallery extends React.Component {
  constructor(props) {
    super(props)

    var thumbPath = `/thumbs/galleries/g${this.props.galleryId}/`
    var images = imageSlides
      .filter(i => i.imggrp_id === props.galleryId)
      .map(i => ({
        ...i,
        srcThumb: thumbPath + path.basename(i.imgslide_path)
      }))
      .sort((l, r) => {
        return l.imgslide_rank - r.imgslide_rank
      })

    this.state = {
      pictures: images
    }
  }

  render() {
    return (
      <div className="container-fluid home-grid">
        <div className="row">
          <div className="col-xs-12">
            <ul className="gallery">
              {this.state.pictures.map(p => (
                <li key={p.imgslide_id}>
                  <a
                    href={p.imgslide_path}
                    rel="group"
                    className="fancybox"
                    title={p.caption}
                  >
                    <img src={p.srcThumb} alt={p.alt || ""} title={p.caption} />
                    {p.caption && (
                      <span>
                        <p>{p.caption}</p>
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    )
  }
}

HomeGallery.propTypes = {
  pictures: PropTypes.array,
  galleryId: PropTypes.number
}

export default HomeGallery
