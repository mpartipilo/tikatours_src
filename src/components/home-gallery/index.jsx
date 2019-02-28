import path from "path"
import React from "react"
import PropTypes from "prop-types"
import Swiper from "react-id-swiper"

class HomeGallery extends React.Component {
  constructor(props) {
    super(props)

    var thumbPath = `/thumbs/galleries/g${this.props.galleryId}/`
    var images = props.imageSlides
      .filter(i => i.imggrp_id == props.galleryId)
      .map(i => ({
        ...i,
        srcThumb: thumbPath + path.basename(i.imgslide_path)
      }))
      .sort((l, r) => {
        return l.imgslide_rank - r.imgslide_rank
      })

    this.state = {
      pictures: images,
      isOpen: false,
      activeSlideKey: 0,
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
  }

  render() {
    return (
      <>
        <div className="container-fluid home-grid">
          <div className="row">
            <div className="col-12">
              <ul className="gallery">
                {this.state.pictures.map(p => (
                  <li key={p.imgslide_id}>
                    <div
                      onClick={() =>
                        this.setState({
                          isOpen: true,
                          activeSlideKey: p.imgslide_id
                        })
                      }
                      rel="group"
                      title={p.imgslide_caption}
                    >
                      <img
                        src={p.srcThumb}
                        alt={p.imgslide_alt || ""}
                        title={p.imgslide_caption}
                      />
                      {p.imgslide_caption && (
                        <span>
                          <p>{p.imgslide_caption}</p>
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="clearfix" />
            </div>
          </div>
        </div>
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
                {this.state.pictures.map(({ imgslide_id, imgslide_path }) => (
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
      </>
    )
  }
}

HomeGallery.propTypes = {
  imageSlides: PropTypes.array,
  galleryId: PropTypes.number
}

export default HomeGallery
