import React, { Component } from 'react'
import MaterialUIForm from 'material-ui-form'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import TokenContract from '../build/contracts/Token.json'
import Web3 from 'web3'
import contract from 'truffle-contract'
import ipfsAPI from 'ipfs-api'
import './App.css';

function getWeb3() {
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      console.log('Injected web3 detected.');

    } else {

      // Fallback to localhost if no web3 injection.

      var provider = new Web3.providers.HttpProvider('http://localhost:8545')

      web3 = new Web3(provider)

      console.log('No web3 instance injected, using Local web3.');
    }

    return web3
}

export default class MyForm extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.ipfsApi = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
    this.state = {
      name: '',
      web3: getWeb3()
    }
  }

  async handleSubmit() {
    const token = contract(TokenContract)
    let ipfsId
    let web3 = this.state.web3
    const data = {
      name: this.state.name,
      "name": this.state.name,
      "image": "https://upload.wikimedia.org/wikipedia/commons/5/5e/00_29_0496_Waipoua_Forest_NZ_-_Kauri_Baum_Tane_Mahuta.jpg", 
      "description": "Kauri seedling sponsored by " + this.state.name, 
      "attributes": {
        "latitude": -37.121102,
        "longitude": 175.629762,
      },
      "background_color": "00FFFF"
    }
     this.ipfsApi.add(new Buffer.from(JSON.stringify(data)))
    .then((response) => {
      console.log(response)
      ipfsId = response[0].hash
      let handleUpdate = this.props.handleUpdate
      web3.eth.getAccounts().then((accounts) => {
          console.log('https://gateway.ipfs.io/ipfs'+ipfsId)
          let account = accounts[0]
          web3.eth.defaultAccount = account
          token.setProvider(web3.eth.currentProvider)
          token.deployed().then(function(instance) {
            instance.mintTo(account, 'https://gateway.ipfs.io/ipfs/'+ipfsId, {from: web3.eth.defaultAccount, value: web3.utils.toWei("0.1")})
            .then((result) => handleUpdate(result))
            .catch((result) => {
              console.error(result)
            })
        })
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  arrayBufferToString(arrayBuffer) {
    return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer))
  }

  handleChange(e) {
    let currentState = this.state
    currentState[e.target.name] = e.target.value
    this.setState(currentState)
  }

  render() {
    return (
      <div>
        <form noValidate autoComplete="off">
          <TextField
            color="white"
            id="name"
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
          />
        </form>
        <button style={{marginTop: 5}} onClick={this.handleSubmit}>Plant a Kauri</button>
      </div>
    )
  }
}