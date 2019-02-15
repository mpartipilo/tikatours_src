import React from "react"
import PropTypes from "prop-types"
import { SpringGrid, makeResponsive, easings, layout } from "react-stonecutter"
import Swiper from "@mootzy/react-id-swiper"

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
      columnWidth: 145,
      currentGallery: -1,
      isOpen: false,
      activeSlideKey: 0,
      Grid: makeResponsive(SpringGrid, {
        maxWidth: 1920,
        minPadding: 10,
        defaultColumns: 6
      }),
      swiperParams: {
        loop: false,
        navigation: {
          nextEl: ".next",
          prevEl: ".prev"
        },
        renderPrevButton: () => (
          <div className="prev">
            <i className="fa fa-angle-left" />
          </div>
        ),
        renderNextButton: () => (
          <div className="next">
            <i className="fa fa-angle-right" />
          </div>
        )
      }
    }

    this.FilterGallery = this.FilterGallery.bind(this)
    this.measureFirstImage = this.measureFirstImage.bind(this)
    this.ImageRefs = []
  }

  componentDidMount() {
    window.addEventListener("resize", this.measureFirstImage)
    setTimeout(this.measureFirstImage, 500)
  }

  componentDidUpdate() {
    this.measureFirstImage()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.measureFirstImage)
  }

  measureFirstImage() {
    if (this.ImageRefs.length == 0) {
      return
    }

    if (!this.ImageRefs[0]) {
      return
    }

    const columnWidth = this.ImageRefs[0].clientWidth

    if (columnWidth == this.state.columnWidth) {
      return
    }

    this.setState({
      columnWidth,
      Grid: makeResponsive(SpringGrid, {
        maxWidth: 1920,
        minPadding: 10,
        defaultColumns: 6
      })
    })
  }

  render() {
    const { groups, photos } = this.props
    const { columnWidth, Grid } = this.state

    const photosFiltered = photos.filter(
      p =>
        this.state.currentGallery === -1 ||
        p.gallery_id == this.state.currentGallery
    )

    const items = photosFiltered.map((p, idx) => (
      <li
        key={p.imgslide_id}
        className="gallery-item"
        data-groups={`["all","${p.gallery_id}"]`}
      >
        <div
          onClick={() =>
            this.setState({ isOpen: true, activeSlideKey: p.imgslide_id })
          }
          title={p.imgslide_caption}
        >
          <img
            src={p.srcThumb}
            alt={p.imgslide_alt}
            title={p.imgslide_caption}
            ref={ref => {
              this.ImageRefs[idx] = ref
            }}
          />
          {p.imgslide_caption && (
            <span>
              <p>{p.imgslide_caption}</p>
            </span>
          )}
        </div>
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
                  gutterWidth={2}
                  gutterHeight={2}
                  columnWidth={columnWidth}
                  itemHeight={columnWidth}
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
        {this.state.isOpen && (
          <div className="ttlightbox">
            <div className="text-right">
              <i
                className="fa fa-times"
                onClick={() => this.setState({ isOpen: false })}
              />
            </div>
            <div style={{ bottom: 0 }}>
              <Swiper
                {...this.state.swiperParams}
                activeSlideKey={this.state.activeSlideKey}
              >
                {photosFiltered.map(({ imgslide_id, imgslide_path }) => (
                  <div
                    key={imgslide_id}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={imgslide_path}
                      style={{
                        display: "block",
                        objectFit: "contain",
                        maxHeight: "90vh"
                      }}
                    />
                  </div>
                )) || []}
              </Swiper>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }

  FilterGallery(event, gallery_id) {
    this.setState({ currentGallery: gallery_id })
  }
}

GalleryIndex.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  groups: PropTypes.array,
  photos: PropTypes.array
}

export default GalleryIndex
