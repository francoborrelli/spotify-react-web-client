import { FC, memo } from 'react';

interface ButtonProps {
  title: string;
  onClick: () => void;
  size?: 'default' | 'small';
}

export const WhiteButton: FC<ButtonProps> = memo((props) => {
  return (
    <button onClick={props.onClick} className={`white-button ${props.size}`}>
      <span>{props.title}</span>
    </button>
  );
});

WhiteButton.displayName = 'WhiteButton';
