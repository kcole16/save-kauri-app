import React, { Component } from 'react';
import logo from './KauriWhiteLogoFront.svg';
import seedling from './seedling.jpg';
import './App.css';
import MyForm from './MyForm.js';
import Map from './Map.js';
import Pending from './Pending.js';

class App extends Component {
  constructor() {
    super()
    this.handleUpdate = this.handleUpdate.bind(this)
    this.state = {
      isCompleted: true,
      isPending: false,
      txHash: ''
    }
  }

  handleUpdate(result) {
    console.log(result)
    setTimeout(() => this.setState({isCompleted: true}), 15000)
}

  render() {
    return (
      <div className="App">
        {this.state.isPending ? <Pending /> : null}
        <div style={{marginTop: 50}}>
          {!this.state.isCompleted ? <div style={{textAlign: 'center'}}>
            <h1 className="App-title">Save the Kauri</h1>
            <img src={seedling} style={{width: 250, borderRadius: 5}} alt="logo" />
            <div style={{width: 350, marginLeft: 'auto', marginRight: 'auto'}}>
              <p>The majestic Kauri trees are dying.</p><p>An initiative know as Kauri 2000 is combating the dieback by planting new Kauri seedling. 
              </p><p style={{marginBottom: 0}}>For just 0.1 ETH, you can sponsor the planting of a seedling, and receive a unique, non-fungible token commemorating your contribution
              as a patron of the Kauri.</p>
            </div>
        <MyForm handleUpdate={this.handleUpdate}/>
          </div> : null }
        {this.state.isCompleted ? <Map /> : null}
          <div style={{textAlign: 'center'}}>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
