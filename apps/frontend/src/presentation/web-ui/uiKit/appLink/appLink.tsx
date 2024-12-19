import { Link } from 'react-router';

import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './appLink.module.css';

type TNavigableProps = {
	to: string;
	className?: string;
};

export function AppLink(props: React.PropsWithChildren<TNavigableProps>) {
	return (
		<Link className={cls(styles.navigable, props.className)} to={props.to}>
			{props.children}
		</Link>
	);
}
