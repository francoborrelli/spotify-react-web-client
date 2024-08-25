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
      <span className='LegacyChipInner__ChipInnerComponent-sc-1qguixk-0 eJmJgo NxEINIJHGytq4gF1r2N1 or84FBarW2zQhXfB9VFb odS2IW9wfNVHhkhc0l_X O0AN8Ty_Cxd4iLwyKATB wQnUXn1m6Gy4PH8jhslb D8wJ9TPfJzLeLJYxnad2 mhuhir0ikRqXAPHU8ZZ1 XNjgtSbyhshr7YQcVvry OxrHhBsQAggwnv6RmqRy oE8LAmRhbeQqsZrQo4lb zWWLnqWslTLHwq3wBgGB pTvxY5yAQklZgb7VZFGS'>
        {text}
      </span>
    </button>
  );
});

Chip.displayName = 'Chip';

export default Chip;
