import React, { Component } from 'react'
import MaterialUIForm from 'material-ui-form'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import TokenContract from '../build/contracts/Token.json'
import Web3 from 'web3'
import contract from 'truffle-contract'

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
    this.state = {
      name: '',
      web3: getWeb3()
    }
  }

  handleChange(e) {
    let currentState = this.state
    currentState[e.target.name] = e.target.value
    this.setState(currentState)
  }

  async handleSubmit() {
    const token = contract(TokenContract)
    let content = '123'
    let web3 = this.state.web3
    await web3.eth.getAccounts().then((accounts) => {
      let account = accounts[0]
      web3.eth.defaultAccount = account
      token.setProvider(web3.eth.currentProvider)
      token.deployed().then(function(instance) {
        instance.mintTo(account, content, {from: web3.eth.defaultAccount, value: web3.utils.toWei("0.1")})
        .catch((result) => {
          console.error(result)
        })
    })
    })
  }

  render() {
    return (
      <form noValidate autoComplete="off">
        <TextField
          id="name"
          label="Name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
        />
      </form>
    )
  }
}