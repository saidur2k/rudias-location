import React from 'react'
import Map from './Map'
import locations from '../data/locations'

const MapContainer = () => <Map locations={locations} multipleMarkers />

export default MapContainer
