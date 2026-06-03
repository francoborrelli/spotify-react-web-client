import { GridItemList } from '../../../components/Lists/list';

import type { ComponentProps, FC } from 'react';

type HomeItemListProps = ComponentProps<typeof GridItemList>;

export const HomeItemList: FC<HomeItemListProps> = (props) => (
  <GridItemList horizontalScroll {...props} />
);
