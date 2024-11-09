import { useMatch, useNavigate } from 'react-router-dom';

import { EAppPath } from '@root/appPath';

import { Icon } from '@uiKit/icon/icon';
import { Navigable } from '@uiKit/navigable/navigable';
import { IconButton } from '@uiKit/iconButton/iconButton';

import styles from './header.module.css';

export type THeaderProps = {
	title?: string;
};

export function Header(props: THeaderProps) {
	let isMain = useMatch(EAppPath.MAIN);
	let navigate = useNavigate();

	return (
		<div className={styles.container}>
			{Boolean(isMain) ? (
				<div />
			) : (
				<IconButton
					onClick={() => {
						navigate(-1);
					}}
					iconName={Icon.IconName.ArrowBack}
					iconSize={Icon.Size.LARGE}
				/>
			)}

			{props.title && <h1 className={styles.title}>{props.title}</h1>}

			<Navigable to={EAppPath.SETTINGS}>
				<Icon name={Icon.IconName.User} size={Icon.Size.LARGE} />
			</Navigable>
		</div>
	);
}
