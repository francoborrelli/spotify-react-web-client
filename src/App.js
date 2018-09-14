import React, { Component } from 'react';
import './App.css';

import LeftSection from './containers/leftSection/leftSection';
import MainSection from './containers/mainSection/mainSection';

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
