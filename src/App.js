import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyForm from './MyForm.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Buy a Kauri Seedling</h1>
        </header>
        <MyForm />
      </div>
    );
  }
}

export default App;
