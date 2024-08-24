import type { FC } from 'react';
import { Tooltip } from '../../../Tooltip';

interface NavigationButtonProps {
  onClick: () => void;
  text: string;
  icon: JSX.Element;
}
const NavigationButton: FC<NavigationButtonProps> = ({ onClick, text, icon }) => {
  return (
    <Tooltip placement='bottom' title={text}>
      <button className='navigation-button' onClick={onClick}>
        {icon}
      </button>
    </Tooltip>
  );
};

export default NavigationButton;
