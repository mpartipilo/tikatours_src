/* global $ */
/* global api */
/* global Hammer */

import React from "react"
import PropTypes from "prop-types"

class Slideshow extends React.Component {
  constructor(props) {
    super(props)

    this.supersized = React.createRef()
    this.initSupersized.bind($)

    this.state = {
      params: {
        slide_interval: 5000,
        transition_speed: 800,
        performance: 0,
        slide_links: "blank",
        slides: props.slides || []
      }
    }
  }

  componentDidMount() {
    this.initSupersized()
  }

  initSupersized() {
    const { params } = this.state
    $(this.supersized).supersized(params)

    $(".prev").click(function() {
      api.prevSlide()
    })
    $(".next").click(function() {
      api.nextSlide()
    })
    var hammertime = new Hammer($(".ss-wrap")[0])
    hammertime.on("swipeleft", function(ev) {
      api.prevSlide()
    })
    hammertime.on("swiperight", function(ev) {
      api.nextSlide()
    })
  }

  render() {
    return (
      <div
        ref={this.supersized}
        className={`ss-wrap ${this.props.fixed ? "fixed" : ""}`}
      >
        <div className="ss-cap" />
        <div className="prev">
          <i className="fa fa-angle-left" />
        </div>
        <div className="next">
          <i className="fa fa-angle-right" />
        </div>
        <div id="slide-list" />
        <div id="supersized-loader" />
        <ul id="supersized" />
      </div>
    )
  }
}

Slideshow.propTypes = {
  fixed: PropTypes.bool,
  slides: PropTypes.array.isRequired
}

export default Slideshow
