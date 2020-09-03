import * as React from 'react';
import { getIcon, IconName } from './icons';

interface IIcon {
  name: IconName;
}

export function Icon(props: IIcon) {
  let SvgIcon = React.useMemo(() => {
    return getIcon(props.name);
  }, [props.name]);

  return <SvgIcon width="32px" height="32px" viewBox="0 0 512 512" />;
}

Icon.IconName = IconName;
