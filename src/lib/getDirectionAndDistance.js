import getDirectionsService from '../services/getDirectionsService'
import getDistanceService from '../services/getDistanceService'

const getDirectionAndDistance = async ({origin, destination, destinations, mode}) => {
  const direction = await getDirectionsService(origin, destination, mode)
  const distance = await getDistanceService(origin, destinations, mode)

  return {
    direction,
    distance
  }
}

export default getDirectionAndDistance
