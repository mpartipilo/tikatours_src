import React from "react"
import PropTypes from "prop-types"
import Swiper from "react-id-swiper"
import { Link } from "gatsby"

// TODO The slides are getting a width that overflows the container. This fixes itself with a window resize.

class ReasonsSlider extends React.Component {
  constructor(props) {
    super(props)
    this.goNext = this.goNext.bind(this)
    this.goPrev = this.goPrev.bind(this)
    this.swiper = null

    this.state = {
      currentSlide: 1
    }
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext()
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev()
  }

  onSlideChange() {
    if (this.swiper) this.setState({ currentSlide: this.swiper.realIndex + 1 })
  }

  render() {
    const { reasons, title, btnUrl, btnText } = this.props

    if (!reasons || reasons.length == 0) {
      return null
    }

    const sortedReasons = reasons.sort((a, b) => a.rank - b.rank)

    const params = {
      loop: true,
      autoplay: {
        delay: 15000,
        disableOnInteraction: false
      },
      on: {
        slideChange: () => this.onSlideChange()
      }
    }

    return (
      <div className="r-wrap text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{title}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
              <div className="carousel">
                <div className="row">
                  <div className="col-12 col-md-8 order-md-2">
                    <div className="slides">
                      <Swiper
                        {...params}
                        ref={node => {
                          if (node) this.swiper = node.swiper
                        }}
                      >
                        {sortedReasons.map(r => (
                          <div key={r.id} className="slide">
                            <p>{r.highlight}</p>
                          </div>
                        )) || []}
                      </Swiper>
                    </div>
                  </div>
                  <div className="col-6 col-md-2 order-md-first reasons-prev">
                    <i
                      className="fa fa-angle-left r-prev"
                      onClick={() => this.goPrev()}
                    />
                  </div>
                  <div className="col-6 col-md-2 order-md-last reasons-next">
                    <i
                      className="fa fa-angle-right r-next"
                      onClick={() => this.goNext()}
                    />
                  </div>
                </div>
                <div className="count">
                  <span>{this.state.currentSlide}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {btnUrl && btnText ? (
                <Link to={btnUrl} className="btn">
                  {btnText}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReasonsSlider.propTypes = {
  reasons: PropTypes.array,
  title: PropTypes.string,
  btnUrl: PropTypes.string,
  btnText: PropTypes.string
}

export default ReasonsSlider
