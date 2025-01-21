import { useNavigate } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';

import { IconButton } from '@root/presentation/web-ui/uiKit/iconButton/iconButton';

import { IconLink } from '@root/presentation/web-ui/uiKit/iconLink/iconLink';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@root/presentation/web-ui/uiKit/icon/iconSize';

import styles from './navbar.module.css';

type TNavbarProps = {};

export function Navbar(props: TNavbarProps) {
	let navigate = useNavigate();

	return (
		<div className={styles.container}>
			<IconButton
				onClick={() => navigate(-1)}
				iconName={EIconName.ArrowBack}
				iconSize={EIconSize.LARGE}
			/>

			<IconLink
				to={EAppPath.SETTINGS}
				iconName={EIconName.User}
				iconSize={EIconSize.LARGE}
			/>
		</div>
	);
}
