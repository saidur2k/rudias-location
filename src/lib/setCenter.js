import averageGeolocation from './averageGeolocation';

const setCenter = locations => {
  let defaultCenter

  if (locations.length > 0) {
    let calculatedAverageLocation = averageGeolocation(locations)
    defaultCenter = {
      lat: calculatedAverageLocation.lat,
      lng: calculatedAverageLocation.lng
    }
  } else {
    defaultCenter = {
      lat: locations[0].lat,
      lng: locations[0].lng
    }
  }

  return defaultCenter
}

export default setCenter
