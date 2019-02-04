import React from "react"
import PropTypes from "prop-types"
import { SpringGrid, makeResponsive, easings, layout } from "react-stonecutter"

import { contentData } from "../i18n-data"

const GalleryIndexTabs = ({ groups, allImagesLabel, onTabClicked, active }) => (
  <React.Fragment>
    <div className="row hidden-xs">
      <div className="col-xs-12">
        <ul className="tabs">
          <li>
            <div
              className={`btn shuffle-btn${
                active === -1 ? " shuffle-active" : ""
              }`}
              title={allImagesLabel}
              onClick={e => onTabClicked(e, -1)}
            >
              {allImagesLabel}
            </div>
          </li>
          {groups.map(g => (
            <li key={g.imggrp_id}>
              <div
                className={`btn shuffle-btn${
                  active === g.gallery_id ? " shuffle-active" : ""
                }`}
                title={g.imggrp_name + " gallery"}
                data-group={g.gallery_id}
                onClick={e => onTabClicked(e, g.gallery_id)}
              >
                {g.imggrp_name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </React.Fragment>
)

GalleryIndexTabs.propTypes = {
  groups: PropTypes.array,
  allImagesLabel: PropTypes.string.isRequired,
  onTabClicked: PropTypes.func.isRequired,
  active: PropTypes.any.isRequired
}

class GalleryIndex extends React.Component {
  constructor(props) {
    super(props)

    const contentDataLoc = contentData[props.currentLanguage]
    const { strings } = contentDataLoc

    this.state = {
      allImagesLabel: strings["All images"],
      currentGallery: -1
    }

    this.GalleryIndexRender = this.GalleryIndexRender.bind(this)
    this.FilterGallery = this.FilterGallery.bind(this)

    this.Grid = makeResponsive(SpringGrid, {
      maxWidth: 1920,
      minPadding: 100
    })
  }

  render() {
    return this.GalleryIndexRender(this.props)
  }

  FilterGallery(event, gallery_id) {
    this.setState({ currentGallery: gallery_id })
  }

  GalleryIndexRender({ groups, photos }) {
    const { Grid } = this

    const items = photos
      .filter(
        p =>
          this.state.currentGallery === -1 ||
          p.gallery_id == this.state.currentGallery
      )
      .map(p => (
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
      ))

    return (
      <React.Fragment>
        {groups && groups.length >= 0 && (
          <div className="container-fluid gallery-index">
            <GalleryIndexTabs
              groups={groups}
              allImagesLabel={this.state.allImagesLabel}
              onTabClicked={this.FilterGallery}
              active={this.state.currentGallery}
            />
            <div className="row">
              <div className="col-xs-12">
                <Grid
                  id="gallery-shuffle"
                  className="gallery"
                  component="ul"
                  columns={5}
                  columnWidth={220}
                  gutterWidth={3}
                  gutterHeight={3}
                  itemHeight={220}
                  layout={layout.simple}
                  easing={easings.cubicOut}
                  springConfig={{ stiffness: 170, damping: 26 }}
                  enter={() => ({ scale: 0, opacity: 0 })}
                  entered={() => ({ scale: 1, opacity: 1 })}
                  exit={() => ({ scale: 0, opacity: 0 })}
                >
                  {items}
                </Grid>
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
