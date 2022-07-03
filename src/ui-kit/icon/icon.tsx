import { EIconSize, iconSizeToPx } from '@ui-kit/icon/icon-size';
import { useMemo } from 'react';
import { getIcon, IconName } from './icons';

type TIconProps = {
	name: IconName;
	size?: EIconSize;
};

export function Icon(props: TIconProps) {
	let size = iconSizeToPx(props.size || EIconSize.MEDIUM);
	let SvgIcon = useMemo(() => {
		return getIcon(props.name);
	}, [props.name]);

	return <SvgIcon width={size} height={size} viewBox="0 0 512 512" />;
}

Icon.IconName = IconName;
Icon.Size = EIconSize;
