import React, { useState, useCallback, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Swiper from "react-id-swiper"
import { Navigation, Autoplay } from 'swiper/js/swiper.esm'

// TODO Sometimes the slides are getting a width that overflows the container. This fixes itself with a window resize.

const ReasonsSlider = ({ reasons, title, btnUrl, btnText }) => {
  if (!reasons || reasons.length == 0) {
    return null
  }

  // TODO Get rid of this, this should never be sorting anything
  const sortedReasons = reasons.sort((a, b) => a.rank - b.rank)

  const [swiper, updateSwiper] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  const swiperRef = useRef(swiper)

  useEffect(() => {
    swiperRef.current = swiper
  })

  const goNext = () => {
    if (swiper) swiper.slideNext()
  }

  const goPrev = () => {
    if (swiper) swiper.slidePrev()
  }

  const onSlideChange = () => {
    if (swiperRef.current) {
      setCurrentSlide(swiperRef.current.realIndex + 1)
    }
  }

  const params = {
    loop: true,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false
    },
    modules: [Navigation, Autoplay],
    getSwiper: updateSwiper,
    on: {
      slideChange: useCallback(onSlideChange)
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
                    <Swiper {...params}>
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
                    onClick={() => goPrev()}
                  />
                </div>
                <div className="col-6 col-md-2 order-md-last reasons-next">
                  <i
                    className="fa fa-angle-right r-next"
                    onClick={() => goNext()}
                  />
                </div>
              </div>
              <div className="count">
                <span>{currentSlide}</span>
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

ReasonsSlider.propTypes = {
  reasons: PropTypes.array,
  title: PropTypes.string,
  btnUrl: PropTypes.string,
  btnText: PropTypes.string
}

export default ReasonsSlider
