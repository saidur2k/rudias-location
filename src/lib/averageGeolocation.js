function averageGeolocation (coords) {
  if (coords.length === 1) {
    return coords[0]
  }

  let x = 0.0
  let y = 0.0
  let z = 0.0

  for (let coord of coords) {
    let lat = (coord.lat * Math.PI) / 180
    let lng = (coord.lng * Math.PI) / 180

    x += Math.cos(lat) * Math.cos(lng)
    y += Math.cos(lat) * Math.sin(lng)
    z += Math.sin(lat)
  }

  let total = coords.length

  x = x / total
  y = y / total
  z = z / total

  let centrallng = Math.atan2(y, x)
  let centralSquareRoot = Math.sqrt(x * x + y * y)
  let centrallat = Math.atan2(z, centralSquareRoot)

  return {
    lat: ((centrallat * 180) / Math.PI),
    lng: ((centrallng * 180) / Math.PI)
  }
}

export default averageGeolocation
