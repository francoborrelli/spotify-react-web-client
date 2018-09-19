import React, { Component } from 'react';

import './popular.css';
import Song from './song';

class PopularTracks extends Component {
  state = {
    showAll: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.tracks !== this.props.tracks) {
      this.setState({ showAll: false });
    }
  }

  renderItems() {
    const tracks = this.props.tracks;
    const items = this.state.showAll ? tracks : tracks.slice(0, 5);
    return items.map((i, key) => <Song item={i} index={key + 1} key={key} />);
  }

  toddleHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  };

  render() {
    return (
      <div className="popular-container">
        <p>Popular</p>
        <div className="songs">{this.renderItems()}</div>
        <button className="more-btn" onClick={this.toddleHandler}>
          {this.state.showAll ? 'Show only 5 songs' : 'Show 5 more'}
        </button>
      </div>
    );
  }
}

export default PopularTracks;
