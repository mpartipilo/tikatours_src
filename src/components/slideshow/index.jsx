import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Swiper from "react-id-swiper"
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/dist/js/swiper.esm'

import { contentData } from "../i18n-data"

// TODO Transition opacity when mounting .ss-cap, .next and .prev

class Slideshow extends React.Component {
  constructor(props) {
    super(props)

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
      renderPrevButton: () => (
        <div className="prev">
          <i
            className="fa fa-angle-left"
            style={{
              display:
                this.state.showCap || !this.props.fixed ? "block" : "none"
            }}
          />
        </div>
      ),
      renderNextButton: () => (
        <div className="next">
          <i
            className="fa fa-angle-right"
            style={{
              display:
                this.state.showCap || !this.props.fixed ? "block" : "none"
            }}
          />
        </div>
      )
    }

    this.createSlideFromRaw = this.createSlideFromRaw.bind(this)

    const { slides, language } = props
    const contentDataLoc = contentData[language]
    const { strings } = contentDataLoc

    this.state = {
      labelWatchVideo: strings["watch video"],
      labelLoadingVideo: strings["loading video"],
      slides,
      params,
      showVideo: false,
      videoId: "",
      showCap: !props.fixed
    }

    this.handleScroll = this.handleScroll.bind(this)

    this.fixed = props.fixed
    this.ssRef = null
    this.capRef = null
    this.ssInitialClassName = props.fixed ? "ss-wrap fixed" : "ss-wrap"
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  componentDidUpdate() {
    if (this.fixed !== this.props.fixed) {
      this.fixed = this.props.fixed

      if (this.ssRef) {
        if (this.fixed) {
          this.ssRef.classList.add("fixed")
        } else {
          this.ssRef.classList.remove("fixed")
        }
      }
    }
  }

  handleScroll(event) {
    const el = document.scrollingElement || document.documentElement
    const scrollTop = el.scrollTop
    const height = document.body.clientHeight
    const wWidth = document.body.clientWidth

    var triggerPoint = height / 2

    if (wWidth >= 768) {
      var capHeight = 0
      if (this.capRef) {
        capHeight = this.capRef.clientHeight
      }
      triggerPoint = height / 2 + capHeight * 1.5
    }

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
    var src = m.imgslide_path
    var cap = m.imgslide_caption
    var cap_heading = m.caption_heading
    //var alt = m.imgslide_alt
    if (m.youtube_id !== "") {
      var youtube_id = m.youtube_id
    } else {
      var button = m.button_label
      var button_url = m.button_url
    }

    return (
      <div key={src}>
        <img src={src} className="slideshow" />
        <div
          className="ss-cap"
          style={{ visibility: this.state.showCap ? "visible" : "hidden" }}
          ref={ref => {
            this.capRef = ref
          }}
        >
          <span>{cap_heading}</span>
          <span className="caption">{cap}</span>
          {button && (
            <div>
              <Link className="btn" to={button_url}>
                {button}
              </Link>
            </div>
          )}
          {youtube_id && (
            <div>
              <a
                href="#"
                className="btn video-link"
                onClick={() => this.watchVideo(youtube_id)}
              >
                <i className="fa fa-youtube-play" />
                {this.state.labelWatchVideo}
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  render() {
    const { slides } = this.state
    const params = slides.length > 1 ? this.state.params : {}
    return (
      <>
        {slides && slides.length > 0 && (
          <div className={this.ssInitialClassName} ref={r => (this.ssRef = r)}>
            <Swiper {...params}>
              {slides.map(this.createSlideFromRaw) || []}
            </Swiper>
          </div>
        )}
        {this.props.children}
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
              src={`https://www.youtube.com/embed/${
                this.state.videoId
              }?rel=0&autoplay=1&showinfo=1`}
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
  language: PropTypes.string.isRequired,
  fixed: PropTypes.bool,
  slides: PropTypes.array.isRequired,
  children: PropTypes.any.isRequired
}

export default Slideshow
