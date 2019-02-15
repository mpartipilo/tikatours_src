import React from "react"
import PropTypes from "prop-types"
import Swiper from "@mootzy/react-id-swiper"

class Gallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
    const { heading, photos } = this.props

    return (
      <React.Fragment>
        {photos && photos.length > 0 && (
          <div className="col-xs-12">
            <h3 className="text-center">{heading}</h3>
            <ul className="gallery text-left">
              {photos.map(m => (
                <li key={m.imgslide_id}>
                  <div
                    onClick={() =>
                      this.setState({
                        isOpen: true,
                        activeSlideKey: m.imgslide_id
                      })
                    }
                    title={m.imgslide_caption}
                  >
                    <img
                      src={m.srcThumb}
                      alt={m.caption_heading}
                      title={m.imgslide_caption}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="clearfix" />
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
                {photos.map(({ imgslide_id, imgslide_path }) => (
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
}

Gallery.propTypes = {
  heading: PropTypes.string,
  photos: PropTypes.array
}

export default Gallery
