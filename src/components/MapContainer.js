import React, { Component } from 'react'
import Map from './Map'
import locations from '../data/locations';
import averageGeolocation from '../lib/averageGeolocation'

export default class MapContainer extends Component {
    
    render() {
        return (
            <Map 
                locations={locations} 
                defaultCenter={averageGeolocation(locations)}
                multipleMarkers={true}
            />
        )
    }
}