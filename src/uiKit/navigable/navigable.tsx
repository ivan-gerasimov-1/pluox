import { Link } from 'react-router-dom';
import styles from './navigable.module.css';

type TNavigableProps = {
	to: string;
};

export function Navigable(props: React.PropsWithChildren<TNavigableProps>) {
	return (
		<Link className={styles.navigable} to={props.to}>
			{props.children}
		</Link>
	);
}
