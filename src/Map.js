import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import marker from './marker.png';
import markerBlack from './marker-black.png';
import TokenContract from '../build_contracts/Token.json';

process.env.MapboxAccessToken = 'pk.eyJ1Ijoia2NvbGUxNiIsImEiOiJjaWc5ZmNoNzEwaW9hdmZsd2lqdTdnMHhpIn0.IgKHGTa-LjzdHd8Y23WzYg'

export default class Map extends React.Component {
  constructor() {
    super()
    this.state = {
        viewport: {
          width:  750,
          height: 450,
          latitude: -37.120,
          longitude: 175.629762,
          zoom: 7
        }
    }
  }

  render() {
    const url = 'https://rinkeby.opensea.io/assets/'+TokenContract['networks'][4]['address']+'/1'
    return (
      <div>
          <div style={{textAlign: 'center'}}>
              <h1 className="App-title">Thank you for your contribution</h1>
              <p>Your Kauri seedling will be planted at the marker below</p>
              <p>Latitude: -37.120, Longitude: 175.629762</p>
              <p>View your Token on OpenSea <a href={url} target="_blank">here</a></p>
            </div>
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken='pk.eyJ1Ijoia2NvbGUxNiIsImEiOiJjaWc5ZmNoNzEwaW9hdmZsd2lqdTdnMHhpIn0.IgKHGTa-LjzdHd8Y23WzYg'
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Marker key={1} longitude={175.629762} latitude={-37.121102} >
                <div className="station"><img style={{height: 20, width: 20}} src={marker} /></div>
              </Marker>
            </div>
          </ReactMapGL>
      </div>
    )
  }
}
