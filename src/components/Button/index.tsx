import { FC } from 'react';

interface ButtonProps {
  title: string;
  onClick: () => void;
  styles?: any;
}

export const WhiteButton: FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} className='white-button' style={props.styles || {}}>
      <span>{props.title}</span>
    </button>
  );
};
