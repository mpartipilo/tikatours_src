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
  }

  componentDidMount() {
    this.initSupersized()
  }

  initSupersized() {
    $(this.supersized).supersized({
      slide_interval: 5000,
      transition_speed: 800,
      performance: 0,
      slide_links: "blank",
      slides: [
        {
          image: "http://www.tikatours.com/library/slides/slide1.jpg",
          title:
            '<span>Discover Amazing Georgia</span><span class="caption">Surrounded by hills, sliced in two by the Mtkvari (Kura) River, with tree-lined boulevards, charming lanes, towering churches and pastel-painted houses, Tbilisi is unexpectedly lovely.</span><div><a href="#" data-href="#slide-1867" class="btn video-link"><i class="fa fa-youtube-play"></i>watch video</a></div>'
        }
      ]
    })

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
  fixed: PropTypes.bool
}

export default Slideshow
