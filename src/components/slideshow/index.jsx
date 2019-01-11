import React from "react"
import PropTypes from "prop-types"
import Swiper from "react-id-swiper"

class Slideshow extends React.Component {
  constructor(props) {
    super(props)

    const params = {
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
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

    const slides = props.slides.map(s => (
      <div key={s.image}>
        <img src={s.image} className="slideshow" />
        {s.title.length && (
          <div
            className="ss-cap"
            dangerouslySetInnerHTML={{ __html: s.title }}
          />
        )}
      </div>
    ))

    this.state = {
      slides,
      params
    }
  }

  render() {
    const params = this.state.slides.length > 1 ? this.state.params : {}
    return (
      <div className={this.props.fixed ? "ss-wrap fixed" : "ss-wrap"}>
        <Swiper {...params}>{this.state.slides}</Swiper>
      </div>
    )
  }
}

Slideshow.propTypes = {
  fixed: PropTypes.bool,
  slides: PropTypes.array.isRequired
}

export default Slideshow
