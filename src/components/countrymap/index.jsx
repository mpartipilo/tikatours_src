import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import "regenerator-runtime/runtime";
import Geocode from "../geocode";

const API_KEY = "AIzaSyBHpsccoDBi78-8IccP48y57zf_i8o2UhU";

const InternalMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `70vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.mapRef}
    defaultCenter={props.defaultCenter}
    defaultZoom={6}
    location={props.location}
    viewport={props.viewport}
  >
    {props.isMarkerShown && (
      <Marker position={props.defaultCenter} onClick={props.onMarkerClick} />
    )}
  </GoogleMap>
));

export default class CountryMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();

    this.state = {
      countryName: this.props.countryName,
      showMap: false
    };
  }

  componentDidMount() {
    Geocode.setApiKey(API_KEY);

    // Get latidude & longitude from address.
    Geocode.fromAddress(`${this.state.countryName} Country`).then(
      response => {
        const { location, viewport } = response.results[0].geometry;
        this.setState({
          defaultCenter: location,
          location,
          viewport,
          showMap: true
        });
      },
      error => {
        throw new Error(error);
      }
    );
  }

  render() {
    return this.state.showMap ? (
      <InternalMap
        isMarkerShown
        mapRef={this.mapRef}
        {...this.props}
        {...this.state}
      />
    ) : (
      <div style={{ height: 0 }} />
    );
  }
}
