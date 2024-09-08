import { FC } from 'react';

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export const WhiteButton: FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} className='white-button'>
      <span>{props.title}</span>
    </button>
  );
};
