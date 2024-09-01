import { ReactNode } from 'react';
import { DeviceIcon, LaptopIcon, MobileIcon } from '../../components/Icons';
import { Device } from '../../interfaces/devices';

export const DeviceIcons: Record<Device['type'], ReactNode> = {
  Computer: <LaptopIcon />,
  Smartphone: <MobileIcon />,
  Speaker: <DeviceIcon />,
};
