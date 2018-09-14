import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';

const style = {
    width: "100%"
}

const mainSection = props => (
<div className="main-section" style={style}>
    <Header/>
    <div className="main-section-container">
    </div>
    <Footer/>
    </div>)

export default mainSection;
