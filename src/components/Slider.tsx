// @ts-ignore
import { Direction, Slider as RPSlider } from 'react-player-controls';

const SliderBar = ({
  value,
  style,
  className,
}: {
  value: number;
  style?: React.CSSProperties;
  className: string;
  direction: Direction;
}) => (
  <div
    className={className}
    style={Object.assign(
      {},
      {
        position: 'absolute',
        borderRadius: 4,
      },
      {
        top: 0,
        bottom: 0,
        left: 0,
        width: `${value * 100}%`,
      },
      style
    )}
  />
);

const SliderHandle = ({
  value,
  style,
  className,
}: {
  value: number;
  style?: React.CSSProperties;
  className: string;
  direction: Direction;
}) => (
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
          transform: 'scale(1.3)',
        },
      },
      {
        top: 0,
        left: `${value * 100}%`,
        marginTop: -3,
        marginLeft: -8,
      },
      style
    )}
  />
);

export const Slider = ({
  isEnabled,
  direction = Direction.HORIZONTAL,
  value,
  ...props
}: {
  isEnabled: boolean;
  direction?: Direction;
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className='volume-sider-container'>
      <RPSlider
        isEnabled={isEnabled}
        direction={direction}
        className='volume-sider'
        style={{
          cursor: 'pointer',
        }}
        {...props}
      >
        <SliderBar className='position-sider' direction={direction} value={value} />
        <SliderHandle className='handler-sider' direction={direction} value={value} />
      </RPSlider>
    </div>
  );
};
