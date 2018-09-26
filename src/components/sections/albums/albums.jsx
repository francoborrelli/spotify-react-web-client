import React, { Component } from 'react';

import axios from '../../../axios';
import Spinner from '../../spinner/spinner';
import withUiAction from '../../../hoc/uiHoc';
import InfiniteScroll from 'react-infinite-scroller';
import Album from '../../items/album';

class Albums extends Component {
  state = {
    albums: [],
    fetching: true
  };

  componentDidMount() {
    axios.get('/me/albums').then(response => {
      this.setState({
        fetching: false,
        albums: response.data.items,
        next: response.data.next
      });
    });
  }

  fetchMore = () => {
    if (this.state.next) {
      axios.get(this.state.next).then(response => {
        this.setState(prevState => {
          return {
            albums: [...prevState.albums, ...response.data.items],
            next: response.data.next
          };
        });
      });
    }
  };

  render = () => {
    return (
      <Spinner section loading={this.state.fetching}>
        <h1>Albums</h1>
        <InfiniteScroll
          className="browse-container"
          hasMore={this.state.next ? true : false}
          loadMore={this.fetchMore}
        >
          {this.state.albums.map((a, i) => (
            <Album
              item={a.album}
              onClick={this.props.onAlbumClick}
              onArtistClick={this.props.onArtistClick}
              key={i}
            />
          ))}
        </InfiniteScroll>
      </Spinner>
    );
  };
}

export default withUiAction(Albums);
