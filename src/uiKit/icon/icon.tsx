import { EIconSize, iconSizeToPx } from '@root/uiKit/icon/iconSize';
import { useMemo } from 'react';
import { getIcon, IconName } from './icons';
import styles from './icon.module.css';

type TIconProps = {
	name: IconName;
	size?: EIconSize;
};

export function Icon(props: TIconProps) {
	let size = iconSizeToPx(props.size || EIconSize.MEDIUM);
	let SvgIcon = useMemo(() => {
		return getIcon(props.name);
	}, [props.name]);

	return (
		<SvgIcon
			width={size}
			height={size}
			viewBox="0 0 512 512"
			className={styles.icon}
		/>
	);
}

Icon.IconName = IconName;
Icon.Size = EIconSize;
