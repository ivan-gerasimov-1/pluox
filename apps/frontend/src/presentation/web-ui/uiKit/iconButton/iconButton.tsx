import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@root/presentation/web-ui/uiKit/icon/iconSize';

import styles from './iconButton.module.css';

export type TIconButtonProps = {
	onClick?: () => void;

	iconName: EIconName;
	iconSize?: EIconSize;
};

export function IconButton(props: TIconButtonProps) {
	return (
		<button
			type="button"
			className={styles.iconButton}
			onMouseDown={props.onClick}
		>
			<Icon name={props.iconName} size={props.iconSize || Icon.Size.MEDIUM} />
		</button>
	);
}
