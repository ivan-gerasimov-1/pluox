import { EAppPath } from '@root/presentation/web-ui/appPath';

import { IconLink } from '@root/presentation/web-ui/uiKit/iconLink/iconLink';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@root/presentation/web-ui/uiKit/icon/iconSize';

import styles from './navbar.module.css';

type TNavbarProps = {};

export function Navbar(props: TNavbarProps) {
	return (
		<div className={styles.container}>
			<IconLink
				className={styles.navLink}
				to={EAppPath.MAIN}
				iconName={EIconName.Circle}
				iconSize={EIconSize.LARGE}
			/>

			<IconLink
				className={styles.navLink}
				to={EAppPath.EXPENSES}
				iconName={EIconName.Infinite}
				iconSize={EIconSize.LARGE}
			/>

			<IconLink
				className={styles.navLink}
				to={EAppPath.SETTINGS}
				iconName={EIconName.Triangle}
				iconSize={EIconSize.LARGE}
			/>
		</div>
	);
}
