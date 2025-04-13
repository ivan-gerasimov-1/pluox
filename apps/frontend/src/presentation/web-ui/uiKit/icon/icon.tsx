import { useMemo } from 'react';

import {
	EIconSize,
	iconSizeToPx,
	type TIconSize,
} from '@root/presentation/web-ui/uiKit/icon/iconSize';

import { getIcon, type TIconName } from './icons';

import styles from './icon.module.css';

type TIconProps = {
	name: TIconName;
	size?: TIconSize;
};

export function Icon(props: TIconProps) {
	let size = iconSizeToPx(props.size || EIconSize.MEDIUM);
	let SvgIcon = useMemo(() => {
		return getIcon(props.name);
	}, [props.name]);

	return (
		<SvgIcon
			/**
			 * @description Type conflict with env.d.ts
			 * @todo Remove @ts-expect-error
			 **/
			// @ts-expect-error | FIX
			width={size}
			height={size}
			viewBox="0 0 512 512"
			className={styles.icon}
		/>
	);
}
