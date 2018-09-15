import React, { Component } from 'react';

export default class Pending extends Component {
  constructor() {
    super()
    this.state = {
      isCompleted: false,
      isPending: false,
      txHash: false
    }
  }

  render() {
    const url = 'https://rinkeby.etherscan.io/tx/'+this.props.txHash
    return (
      <div style={{zIndex: 1, position: 'absolute', top: 0, left: 0, height: '2000px', width: '100%', background: 'rgba(0,0,0,0.4)'}}>
        <div style={{height: 350, width: 500, backgroundColor: 'white', borderRadius: 4, marginTop: 100, marginRight: 'auto', marginLeft: 'auto', zIndex: 0}}>
          <p style={{paddingTop: 25}}>Your transaction is pending!</p>
          <p>Check it out here: <a href={url}>{url}</a></p>
        </div>
      </div>
    );
  }
}
