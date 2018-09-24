import React from 'react';
import { Direction, Slider } from 'react-player-controls';

const SliderBar = ({ value, style, className }) => (
  <div
    className={className}
    style={Object.assign(
      {},
      {
        position: 'absolute',
        borderRadius: 4
      },
      {
        top: 0,
        bottom: 0,
        left: 0,
        width: `${value * 100}%`
      },
      style
    )}
  />
);

const SliderHandle = ({ value, style, className }) => (
  <div
    className={className}
    style={Object.assign(
      {},
      {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: '100%',
        transform: 'scale(1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.3)'
        }
      },
      {
        top: 0,
        left: `${value * 100}%`,
        marginTop: -3,
        marginLeft: -8
      },
      style
    )}
  />
);

const ProgressBar = ({
  isEnabled,
  direction = Direction.HORIZONTAL,
  value,
  ...props
}) => {
  const volumeClass =
    value > 0.5
      ? 'fa-volume-up'
      : value === 0
        ? 'fa-volume-off'
        : 'fa-volume-down';
  return (
    <div className="volume-sider-container">
      <i
        onClick={props.onClick}
        className={'volumen fa ' + volumeClass}
        aria-hidden="true"
      />
      <Slider
        isEnabled={isEnabled}
        direction={direction}
        className="volume-sider"
        style={{
          cursor: 'pointer'
        }}
        {...props}
      >
        <SliderBar
          className="position-sider"
          direction={direction}
          value={value}
        />
        <SliderHandle
          className="handler-sider"
          direction={direction}
          value={value}
        />
      </Slider>
    </div>
  );
};

export default ProgressBar;
