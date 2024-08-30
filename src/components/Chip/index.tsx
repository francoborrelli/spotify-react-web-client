import { FC, memo, ReactNode } from 'react';

interface ChipProps {
  active?: boolean;
  onClick?: () => void;
  text: string | ReactNode;
}

export const Chip: FC<ChipProps> = memo((props) => {
  const { text, active, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={`chip ${active ? 'active' : ''}`}
      role='checkbox'
      aria-checked='false'
      data-encore-id='chip'
      style={{
        marginBlockEnd: '0px',
        willChange: 'transform, opacity',
      }}
      data-roving-interactive='1'
    >
      <span>{text}</span>
    </button>
  );
});

Chip.displayName = 'Chip';

export default Chip;
