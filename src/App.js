import React, { Component } from 'react';
import './App.css';

import LeftSection from './components/leftSection/leftSection';
import MainSection from './components/mainSection/mainSection';

class App extends Component {
  render() {
    return (
      <div className="app">
        <LeftSection></LeftSection>
        <MainSection></MainSection>
        </div>
    );
  }
}

export default App;
