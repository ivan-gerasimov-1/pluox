import { useMatch } from 'react-router-dom';

import { EAppPath } from '@root/appPath';

import { AuthService } from '@core/infrastructure/authService/AuthService';

import { Icon } from '@uiKit/icon/icon';
import { Navigable } from '@uiKit/navigable/navigable';
import { IconButton } from '@uiKit/iconButton/iconButton';

import styles from './header.module.css';

export type THeaderProps = {
	title?: string;
};

export function Header(props: THeaderProps) {
	let isMain = useMatch(EAppPath.MAIN);
	let isAuthenticated = AuthService.getInstance().isAuthenticated();

	return (
		<div className={styles.container}>
			{Boolean(isMain) ? (
				<div />
			) : (
				<IconButton
					onClick={() => window.history.back()}
					iconName={Icon.IconName.ArrowBack}
					iconSize={Icon.Size.LARGE}
				/>
			)}

			{props.title && <h1 className={styles.title}>{props.title}</h1>}

			{isAuthenticated ? (
				<Navigable to={EAppPath.SETTINGS}>
					<Icon name={Icon.IconName.User} size={Icon.Size.LARGE} />
				</Navigable>
			) : (
				<Navigable to={EAppPath.LOGIN}>
					<Icon name={Icon.IconName.LogIn} size={Icon.Size.LARGE} />
				</Navigable>
			)}
		</div>
	);
}
