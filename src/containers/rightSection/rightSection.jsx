import React from 'react';

import github from '../../images/github.png';

import './rightSection.css';

const UserHeader = (props) => (
  <a
    target='_blank'
    rel='noopener noreferrer'
    href='https://github.com/francoborrelli/spotify-react-web-client'
  >
    <div className='user-header'>
      <div className='details-container'>
        <img alt='user' className='user-image' src={props.img} />
        <p className='user-name'>{props.username}</p>
      </div>
    </div>
  </a>
);

const rightSection = (props) => (
  <div className='right-section'>
    <div className='header'>
      <h4>Friends Activity</h4>

      <UserHeader img={github} username={'Source code'} />
    </div>
  </div>
);

export default rightSection;
