import React, { useState, useCallback, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Swiper from "react-id-swiper"
import {
  Navigation,
  Autoplay,
  Pagination,
  EffectFade
} from "swiper/dist/js/swiper.esm"

// TODO Transition opacity when mounting .ss-cap, .next and .prev

const SliderCaption = ({
  heading,
  caption,
  button,
  buttonUrl,
  youtubeId,
  labelWatchVideo,
  onWatchVideoRequested
}) => (
  <>
    <span style={{ textShadow: "#330000 1px 1px 3px, 0px 0.2em 0.4em black" }}>
      {heading}
    </span>
    <span style={{ textShadow: "#330000 1px 1px 2px" }} className="caption">
      {caption}
    </span>
    {button && (
      <div>
        <Link className="btn" to={buttonUrl}>
          {button}
        </Link>
      </div>
    )}
    {youtubeId && (
      <div>
        <a
          href="#"
          className="btn video-link"
          onClick={() => onWatchVideoRequested(youtubeId)}
        >
          <i className="fa fa-youtube-play" />
          {labelWatchVideo}
        </a>
      </div>
    )}
  </>
)

const ButtonCommon = ({ isNext, show }) => (
  <div className={isNext ? "next" : "prev"}>
    <i
      className={`fa fa-angle-${isNext ? "right" : "left"}`}
      style={{
        display: show ? "block" : "none"
      }}
    />
  </div>
)

const SlideTemplate = ({ src }) => <img src={src} className="slideshow" />

const Slider = ({ children, showButtons, onSlideChange }) => {
  const [swiper, updateSwiper] = useState(null)
  const swiperRef = useRef(swiper)

  useEffect(() => {
    swiperRef.current = swiper
  })

  const onSwiperSlideChange = () => {
    if (swiperRef.current && onSlideChange) {
      onSlideChange(swiperRef.current.realIndex)
    }
  }

  const params = {
    modules: [Navigation, Autoplay, Pagination, EffectFade],
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 8000,
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
    renderPrevButton: () => <ButtonCommon show={showButtons} />,
    renderNextButton: () => <ButtonCommon show={showButtons} isNext />,
    getSwiper: updateSwiper,
    on: {
      slideChange: useCallback(onSwiperSlideChange)
    }
  }

  return <Swiper {...params}>{children}</Swiper>
}

class Slideshow extends React.Component {
  constructor(props) {
    super(props)

    this.watchVideo = this.watchVideo.bind(this)

    const { slides, strings } = props

    this.state = {
      labelWatchVideo: strings["watch_video"],
      labelLoadingVideo: strings["loading_video"],
      slides,
      showVideo: false,
      videoId: "",
      showCap: !props.fixed,
      currentSlide: 0
    }

    this.handleScroll = this.handleScroll.bind(this)

    this.fixed = props.fixed
    this.capRef = null
    this.ssInitialClassName = props.fixed ? "ss-wrap fixed" : "ss-wrap"
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll(event) {
    const el = document.scrollingElement || document.documentElement
    const scrollTop = el.scrollTop
    const height = document.body.clientHeight
    const wWidth = document.body.clientWidth

    var capHeight = 0

    if (wWidth >= 768 && this.capRef) {
      capHeight = this.capRef.clientHeight
    }

    var triggerPoint = height / 2 + capHeight * 1.2

    const showCap = scrollTop > triggerPoint

    if (this.state.showCap == showCap) {
      return
    }

    this.setState({
      showCap
    })
  }

  watchVideo(videoId) {
    this.setState({
      showVideo: true,
      videoId
    })
  }

  createSlideFromRaw(m) {
    var result = {
      src: m.imgslide_path,
      caption: m.imgslide_caption,
      heading: m.caption_heading
    }
    //var alt = m.imgslide_alt
    return m.youtube_id !== ""
      ? {
          ...result,
          youtubeId: m.youtube_id
        }
      : {
          ...result,
          button: m.button_label,
          buttonUrl: m.button_url
        }
  }

  render() {
    const { slides, currentSlide, showCap, labelWatchVideo } = this.state
    const showCaption = showCap || !this.props.fixed
    return (
      <>
        {slides && slides.length > 0 && (
          <div className={this.ssInitialClassName} ref={this.props.forwardRef}>
            <div
              className="ss-cap"
              style={{
                visibility: showCaption ? "visible" : "hidden",
                zIndex: 2
              }}
              ref={ref => {
                this.capRef = ref
              }}
            >
              <SliderCaption
                {...slides[currentSlide]}
                labelWatchVideo={labelWatchVideo}
                onWatchVideoRequested={this.watchVideo}
              />
            </div>
            <Slider
              showButtons={showCaption}
              onSlideChange={s => this.setState({ currentSlide: s })}
            >
              {slides.map(s => (
                <div key={s.src}>
                  <SlideTemplate src={s.src} />
                </div>
              )) || []}
            </Slider>
          </div>
        )}
        {this.state.showVideo && (
          <div className="video-wrap" style={{ display: "block" }}>
            <span>{this.state.labelLoadingVideo}...</span>
            <div className="text-right">
              <i
                className="fa fa-times"
                onClick={() => this.setState({ showVideo: false })}
              />
            </div>
            <iframe
              width="100%"
              height="95%"
              src={`https://www.youtube.com/embed/${this.state.videoId}?rel=0&autoplay=1&showinfo=1`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
      </>
    )
  }
}

Slideshow.defaultProps = {
  slides: []
}

Slideshow.propTypes = {
  strings: PropTypes.object.isRequired,
  fixed: PropTypes.bool,
  slides: PropTypes.array.isRequired,
  forwardRef: PropTypes.object
}

function SlideshowWithForwardRef(props, ref) {
  return <Slideshow {...props} forwardRef={ref} />
}

const SlideshowWithRef = React.forwardRef(SlideshowWithForwardRef)

export default SlideshowWithRef
