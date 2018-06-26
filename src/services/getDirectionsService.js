function getDirectionsPromise (origin, destination, modeOfTravel) {
  const DirectionsService = new window.google.maps.DirectionsService()

  return new Promise((resolve, reject) => {
    DirectionsService.route({
      origin: new window.google.maps.LatLng(origin.lat, origin.lng),
      destination: new window.google.maps.LatLng(destination.lat, destination.lng),
      travelMode: modeOfTravel
    }, (result, status) => {
      if (status === 'OK') {
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
}

function getDirectionsService (origin, destination, modeOfTravel) {
  if (origin && destination && modeOfTravel) {
    return getDirectionsPromise(
      origin,
      destination,
      modeOfTravel
    ).then(result => {
      return result
    }).catch(err => { console.error(err) })
  }
}

export default getDirectionsService
export { getDirectionsPromise }
