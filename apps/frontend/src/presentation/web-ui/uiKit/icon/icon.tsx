import { getIcon, type TIconName } from './icons';
import { useMemo } from 'react';

import {
	EIconSize,
	iconSizeToPx,
	type TIconSize,
} from '@/presentation/web-ui/uiKit/icon/iconSize';

type TIconProps = {
	name: TIconName;
	size?: TIconSize;
};

export function Icon(props: TIconProps) {
	let size = iconSizeToPx(props.size || EIconSize.MEDIUM);
	let SvgIcon = useMemo(() => {
		return getIcon(props.name);
	}, [props.name]);

	return <SvgIcon width={size} height={size} className="text-inherit" />;
}
