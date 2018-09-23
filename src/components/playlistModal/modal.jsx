import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from '../../axios';
import { setModal } from '../../store/actions/uiActions';

import './modal.css';
import song from '../../containers/mainSection/images/song.png';

class Modal extends PureComponent {
  state = {};

  componentWillMount() {
    this.initialize();
  }

  initialize = () => {
    this.setState({
      title: 'New Playlist',
      description: '',
      error: false
    });
  };

  handleChange = (input, event) => {
    input === 'title'
      ? this.setState({ title: event.target.value })
      : this.setState({ description: event.target.value });
  };

  validate = () => {
    const title = this.state.title;
    if (!title.replace(/\s/g, '').length) {
      this.setState({ error: true });
      return false;
    }
    return true;
  };

  onCancel = () => {
    this.initialize();
    this.props.setModal(false);
  };

  onSubmit = () => {
    if (this.validate()) {
      axios
        .post(`/users/${this.props.id}/playlists`, {
          name: this.state.title,
          description: this.state.description
        })
        .then(() => this.props.setModal(false));
    }
  };

  render() {
    return (
      <div>
        <div className={`playlist-Modal ${this.props.show ? 'active' : ''}`}>
          <div className="modal-content">
            <div className="modal-title">
              <h4>Create Playlist</h4>
            </div>
            <div className="modal-body">
              <div className="title-input">
                <span>Name</span>
                <input
                  value={this.state.title}
                  onChange={event => this.handleChange('title', event)}
                  placeholder="Playlist name"
                  maxLength="100"
                />
                <div className="counter">{`${
                  this.state.title.length
                }/100`}</div>
                <div className="description">
                  <div className="image">
                    <span>Image</span> <img alt="song" src={song} />
                  </div>
                  <div className="text">
                    <span>Description</span>
                    <div className="counter">{`${
                      this.state.description.length
                    }/300`}</div>
                    <textarea
                      onChange={event =>
                        this.handleChange('description', event)
                      }
                      placeholder="Give your playlist a catchy description."
                      maxLength="300"
                    />
                  </div>
                </div>
                <div
                  className={`error-message ${
                    this.state.error ? 'active' : ''
                  }`}
                >
                  <i className="fa fa-exclamation" aria-hidden="true" />
                  <span>You must give your playlist a name.</span>
                </div>
                <div className="btn-section">
                  <button className="cancel-btn" onClick={this.onCancel}>
                    Cancel
                  </button>
                  <button className="save-btn" onClick={this.onSubmit}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`overlay ${this.props.show ? 'active' : ''}`}
          onClick={this.onCancel}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.uiReducer.modal,
    id: state.userReducer.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setModal
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
