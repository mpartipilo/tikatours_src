import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

class HomeOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = { opacity: 1 }

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
    const opacity = (height - scrollTop) / height

    this.setState({
      opacity
    })
  }

  render() {
    const { heading, subheading, intro, btn_text, btn_url } = this.props
    return (
      <div className="overlay" style={{ opacity: this.state.opacity || 0 }}>
        <div className="container-fluid">
          <section className="row t-row" />
          <section className="row m-row">
            <div className="col-xs-2 col-sm-2 col-md-4">
              <div className="hidden-xs hidden-sm pad">
                <h1>{heading}</h1>
                {subheading && <h2>{subheading}</h2>}
              </div>
            </div>
            <div className="col-xs-8 col-sm-8 col-md-4 text-center">
              <div className="motif" />
            </div>
            <div className="col-xs-2 col-sm-2 col-md-4">
              <div className="hidden-xs hidden-sm pad">
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
            <div className="col-xs-12">
              <div className="visible-xs visible-sm text-center">
                {heading}
                {subheading && <h2>{subheading}</h2>}
              </div>
              <div className="text-center">
                <i className="fa fa-angle-double-down" />
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

HomeOverlay.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  intro: PropTypes.string,
  btn_text: PropTypes.string,
  btn_url: PropTypes.string
}

export default HomeOverlay
