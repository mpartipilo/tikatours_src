import React from "react"
import PropTypes from "prop-types"
import { CSSTransition } from "react-transition-group"
import format from "string-format"
import CountryMap from "../countrymap"
import { contentData } from "../i18n-data"

import "./styles.scss"

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
    const { strings, countryName } = this.props

    return (
      <React.Fragment>
        <div id="map-upper" data-toggle="#map-canvas" onClick={this.toggleMap}>
          <p>
            <i className="fa fa-map-marker" />
          </p>
          <p className="xxl">{format(strings["Where_in_the_world_is__country__"], strings[countryName])}</p>
          <p>
          {strings[`Click_to_${this.state.mapVisible ? "hide" : "see"}_map`]}
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
          timeout={{ enter: 1000, exit: 1000 }}
          classNames="mapInView"
          unmountOnExit
        >
          {state => (
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
  countryName: PropTypes.string,
  strings: PropTypes.object.isRequired
}

export default MapCanvasView
