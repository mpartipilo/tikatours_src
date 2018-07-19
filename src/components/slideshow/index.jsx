import React from "react"
import PropTypes from "prop-types"

const Slideshow = props => (
  <div className={`ss-wrap ${props.fixed ? "fixed" : ""}`}>
    <div className="ss-cap" />
    <div className="prev">
      <i className="fa fa-angle-left" />
    </div>
    <div className="next">
      <i className="fa fa-angle-right" />
    </div>
    <div id="slide-list" />
  </div>
)

Slideshow.propTypes = {
  fixed: PropTypes.bool
}

export default Slideshow
