/* eslint-disable react/display-name */
import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const HomeOverlayTemplateWithRef = React.forwardRef((props, ref) => (
  <HomeOverlayTemplate {...props} fRef={ref} />
))

const HomeOverlayTemplate = ({
  heading,
  subheading,
  intro,
  btn_text,
  btn_url,
  scrollOverlayUp,
  opacity,
  fRef
}) => (
  <div className="overlay" ref={fRef}>
    <div className="container-fluid">
      <section className="row t-row" />
      <section className="row m-row">
        <div className="col-2 col-sm-2 col-md-4">
          <div className="d-none d-lg-block pad">
            <h1>{heading}</h1>
            {subheading && <h2>{subheading}</h2>}
          </div>
        </div>
        <div className="col-8 col-sm-8 col-md-4 text-center">
          <div className="motif" />
        </div>
        <div className="col-2 col-sm-2 col-md-4">
          <div className="d-none d-lg-block pad">
            {intro && (
              <p
                dangerouslySetInnerHTML={{
                  __html: intro.replace(/(?:\r\n|\r|\n)/g, "<br />")
                }}
              />
            )}
            {btn_text && btn_url && (
              <p>
                <Link to={btn_url} className="btn">
                  {btn_text}
                </Link>
              </p>
            )}
          </div>
        </div>
        <div className="dummy">
          <div className="l" />
          <div className="r" />
        </div>
      </section>
      <section className="row b-row">
        <div className="col-12">
          <div className="d-block d-lg-none text-center">
            {heading && <h1>{heading}</h1>}
            {subheading && <h2>{subheading}</h2>}
          </div>
          <div className="text-center">
            <i
              className="fa fa-angle-double-down"
              onClick={() => scrollOverlayUp()}
            />
          </div>
        </div>
      </section>
    </div>
  </div>
)

class HomeOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.refOverlay = React.createRef()
    this.visible = true

    this.handleScroll = this.handleScroll.bind(this)
    this.scrollOverlayUp = this.scrollOverlayUp.bind(this)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  scrollOverlayUp() {
    if (!this.refOverlay.current) {
      return
    }

    const height = this.refOverlay.current.clientHeight
    window.scrollTo({ top: height, behavior: "smooth" })
  }

  handleScroll(event) {
    const el = document.scrollingElement || document.documentElement
    const scrollTop = el.scrollTop

    if (!this.refOverlay.current) {
      return
    }

    const height = document.body.clientHeight
    const opacity = Math.max((height - scrollTop) / height, 0)

    this.refOverlay.current.style.opacity = opacity

    const overlayHeight = this.refOverlay.current.clientHeight
    const visible = scrollTop <= overlayHeight

    if (this.visible == visible) {
      return
    }

    this.visible = visible
    this.props.visibleChanged(visible)
  }

  render() {
    const { heading, subheading, intro, btn_text, btn_url } = this.props
    return (
      <HomeOverlayTemplateWithRef
        {...this.props}
        scrollOverlayUp={this.scrollOverlayUp}
        ref={this.refOverlay}
      />
    )
  }
}

HomeOverlay.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  intro: PropTypes.string,
  btn_text: PropTypes.string,
  btn_url: PropTypes.string,
  visibleChanged: PropTypes.func.isRequired
}

export default HomeOverlay
