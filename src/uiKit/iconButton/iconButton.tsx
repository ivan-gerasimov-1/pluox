import { Icon } from '@uiKit/icon/icon';
import { EIconName } from '@uiKit/icon/icons';
import { EIconSize } from '@uiKit/icon/iconSize';

import styles from './iconButton.module.css';

export type TIconButtonProps = {
	onClick?: () => void;

	iconName: EIconName;
	iconSize?: EIconSize;
};

export function IconButton(props: TIconButtonProps) {
	return (
		<button type="button" className={styles.iconButton} onClick={props.onClick}>
			<Icon name={props.iconName} size={props.iconSize || Icon.Size.MEDIUM} />
		</button>
	);
}
