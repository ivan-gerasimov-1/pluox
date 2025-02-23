import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import type { TIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import {
	EIconSize,
	type TIconSize,
} from '@root/presentation/web-ui/uiKit/icon/iconSize';

import styles from './iconButton.module.css';

export type TIconButtonProps = {
	onClick?: () => void;

	iconName: TIconName;
	iconSize?: TIconSize;
};

export function IconButton(props: TIconButtonProps) {
	return (
		<button type="button" className={styles.iconButton} onClick={props.onClick}>
			<Icon name={props.iconName} size={props.iconSize || EIconSize.MEDIUM} />
		</button>
	);
}
