import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const mapsBootload = {
  googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />
}

const MyMapComponent = compose(
  withProps(mapsBootload),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap 
    defaultZoom={8} defaultCenter={{lat: props.defaultCenter.latitude, lng: props.defaultCenter.longitude}}>
    {
      props.locations.map(item => <Marker key={item.id} position={{ lat: item.latitude, lng: item.longitude }} />)
    }
  </GoogleMap>
));

const enhance = _.identity;

export default enhance(MyMapComponent);