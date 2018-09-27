import React from 'react';

const device = props => {
  const active = props.item.is_active;
  let icon;
  switch (props.item.type) {
    case 'Smartphone':
      icon = 'fa-mobile';
      break;
    case 'Speaker':
      icon = 'fa-headphones';
      break;
    default:
      icon = 'fa-laptop';
      break;
  }
  return (
    <div
      className={`device ${active ? 'active' : ''}`}
      onClick={
        active
          ? null
          : () => {
              props.onClick(props.item.id);
            }
      }
    >
      <div className="icon">
        <i className={`fa ${icon}`} aria-hidden="true" />
      </div>
      <div className="details">
        <h4>{active ? 'Listening on' : props.item.name}</h4>
        <span>
          <i className="fa fa-spotify" aria-hidden="true" />{' '}
          {active ? props.item.name : 'Spotify Connect'}
        </span>
      </div>
    </div>
  );
};

export default device;
