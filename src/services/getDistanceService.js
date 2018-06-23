
function getDistancePromise (origin, destinations, modeOfTravel) {
  const service = new window.google.maps.DistanceMatrixService()
  let origin1 = new window.google.maps.LatLng(origin.lat, origin.lng)
  let destinations1 = destinations.map(item => new window.google.maps.LatLng(item.lat, item.lng))

  return new Promise((resolve, reject) => {
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: destinations1,
        travelMode: modeOfTravel,
        avoidTolls: true
      }
      , (result, status) => {
        if (status === 'OK') {
          resolve(result)
        } else {
          reject(result)
        }
      })
  })
}

const formatDistanceMatrix = (row, title, stationName) => {
  return {
    title,
    stationName,
    distance: row.distance,
    duration: row.duration
  }
}

function getDistanceService (origin, destinations, modeOfTravel) {
  if (origin && modeOfTravel) {
    return getDistancePromise(
      origin,
      destinations,
      modeOfTravel
    ).then(result => {
      const output = result.rows[0].elements.map((item, index) => formatDistanceMatrix(item, result.destinationAddresses[index], destinations[index].title))
      return output
    }).catch(err => { console.error(err) })
  }
}

export default getDistanceService
