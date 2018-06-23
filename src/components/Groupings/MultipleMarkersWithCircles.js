import MarkerWithCircle from './MarkerWithCircle'

const MultipleMarkersWithCircles = ({
  locations,
  shouldMarkerBeActive,
  setActiveMarker
}) =>
  locations.map(item =>
    MarkerWithCircle({ item, shouldMarkerBeActive, setActiveMarker })
  )

export default MultipleMarkersWithCircles
