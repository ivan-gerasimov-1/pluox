import { Link } from 'react-router-dom';
import styles from './navigable.module.css';
import { cls } from '@utils/classnames';

type TNavigableProps = {
	to: string;
	className?: string;
};

export function Navigable(props: React.PropsWithChildren<TNavigableProps>) {
	return (
		<Link className={cls(styles.navigable, props.className)} to={props.to}>
			{props.children}
		</Link>
	);
}
