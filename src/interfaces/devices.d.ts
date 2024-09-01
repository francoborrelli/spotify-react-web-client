export interface Device {
  /**
   * @description The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached device_id should periodically be cleared out and refetched as necessary.
   */
  id: string;

  /**
   * @description If this device is the currently active device.
   */
  is_active: boolean;

  /**
   * @description If this device is currently in a private session.
   * @default false
   */
  is_private_session: boolean;

  /**
   * @description Whether controlling this device is restricted. At present if this is “true” then no Web API commands will be accepted by this device.
   * @default false
   */
  is_restricted: boolean;

  /**
   * @description A human-readable name for the device. Some devices have a name that the user can configure (e.g. "Loudest speaker") and some devices have a generic name associated with the manufacturer or device mode
   */
  name: string;

  /**
   * @description Device type, such as “Computer”, “Smartphone” or “Speaker”.
   */
  type: 'Computer' | 'Smartphone' | 'Speaker';

  /**
   * @description The current volume in percent. This may be null.
   */
  volume_percent: number | null;

  /**
   * @description If this device can be used to set the volume.
   */
  supports_volume: boolean;
}
