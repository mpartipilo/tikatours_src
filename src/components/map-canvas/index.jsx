import React from "react"
import PropTypes from "prop-types"
import { CSSTransition } from 'react-transition-group'

import CountryMap from "../countrymap"

class MapCanvasView extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.state = {
      mapVisible: false
    }

    this.toggleMap = this.toggleMap.bind(this)
  }

  toggleMap() {
    this.setState({ mapVisible: !this.state.mapVisible })
  }

  render() {
    return (
      <React.Fragment>
        <div id="map-upper" data-toggle="#map-canvas" onClick={this.toggleMap}>
          <p>
            <i className="fa fa-map-marker" />
          </p>
          <p className="xxl">Where in the World is {this.props.countryName}?</p>
          <p>
            Click to {this.state.mapVisible ? "hide" : "see"} map{" "}
            <i
              className={
                "fa fa-" +
                (this.state.mapVisible
                  ? "angle-double-up"
                  : "angle-double-down")
              }
            />
          </p>
        </div>
        <CSSTransition
          in={this.state.mapVisible}
          transitionName="mapInView"
          timeout={500}
        >
          {this.state.mapVisible && (
            <div key="mapInView">
              <div id="map-view">
                <CountryMap
                  countryName={this.props.countryName}
                  ref={this.mapRef}
                />
              </div>
            </div>
          )}
        </CSSTransition>
      </React.Fragment>
    )
  }
}

MapCanvasView.propTypes = {
  countryName: PropTypes.string
}

export default MapCanvasView
