const { getWidth } = require('./getViewPort')

// over 480 - the desktop version of the fitted map looks good, less than 480 - a lot of grey space on top and under the map
const MAX_MOBILE_WIDTH = 480

function FitMarkersOnMap (map, properties, multipleMarkers, fitMap, zoomIn) {
  const width = getWidth()
  if (multipleMarkers && fitMap && width >= MAX_MOBILE_WIDTH) {
    const bounds = new window.google.maps.LatLngBounds()

    properties.forEach(p => {
      bounds.extend(new window.google.maps.LatLng(p.lat, p.lng))
    })

    if (map) {
      map.fitBounds(bounds)
    }
  } else if (multipleMarkers && fitMap && map && width < MAX_MOBILE_WIDTH) {
    if (map.getZoom() !== 1) {
      zoomIn(1)
    }
  }
}

export default FitMarkersOnMap
