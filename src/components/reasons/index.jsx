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

    const sortedReasons = reasons.sort((a, b) => b.rank - a.rank)

    const params = {
      loop: true,
      autoplay: {
        delay: 3000,
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
            <div className="col-xs-12">
              <h2>{title}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-push-1 col-md-10 col-md-push-1 col-lg-8 col-lg-push-2">
              <div className="carousel">
                <div className="row">
                  <div className="col-xs-12 col-sm-8 col-sm-push-2">
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
                  <div className="col-xs-6 col-sm-2 col-sm-pull-8 reasons-prev">
                    <i
                      className="fa fa-angle-left r-prev"
                      onClick={() => this.goPrev()}
                    />
                  </div>
                  <div className="col-xs-6 col-sm-2 reasons-next">
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
            <div className="col-xs-12">
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
