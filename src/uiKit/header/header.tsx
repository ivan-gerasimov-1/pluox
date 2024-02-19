import { useMatch } from 'react-router-dom';

import { EAppPath } from '@root/appPath';

import { AuthService } from '@core/infrastructure/authService/AuthService';

import { Icon } from '@uiKit/icon/icon';
import { Navigable } from '@uiKit/navigable/navigable';

import styles from './header.module.css';

export type THeaderProps = {
	title?: string;
};

export function Header(props: THeaderProps) {
	const isMain = useMatch(EAppPath.MAIN);
	let isAuthenticated = AuthService.getInstance().check();

	return (
		<div className={styles.container}>
			{Boolean(isMain) ? (
				<div />
			) : (
				<Navigable to={EAppPath.MAIN}>
					<Icon name={Icon.IconName.Back} size={Icon.Size.LARGE} />
				</Navigable>
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
