import React from "react"
import PropTypes from "prop-types"
import Swiper from "react-id-swiper"
import { Link } from "gatsby"

import { contentData } from "../i18n-data"

// TODO Transition opacity when mounting .ss-cap, .next and .prev

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
    const height = event.srcElement.body.clientHeight
    const wWidth = event.srcElement.body.clientWidth

    if (wWidth < 768) {
      var triggerPoint = height / 2
    } else {
      var triggerPoint = height / 2
      //   var triggerPoint = height / 2 + capHeight * 1.5
    }

    const showCap = scrollTop > triggerPoint

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
        {this.state.showCap && (
          <div className="ss-cap">
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
        )}
      </div>
    )
  }

  render() {
    const { slides } = this.state
    const params = slides.length > 1 ? this.state.params : {}
    return (
      <>
        {slides && slides.length > 0 && (
          <div className={this.props.fixed ? "ss-wrap fixed" : "ss-wrap"}>
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
