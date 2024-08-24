import { TooltipProps, Tooltip as TooltipAntd } from 'antd';

export const Tooltip = (props: TooltipProps) => {
  return <TooltipAntd placement='top' {...props} color='#242424' arrow={false} />;
};

Tooltip.displayName = 'Tooltip';
