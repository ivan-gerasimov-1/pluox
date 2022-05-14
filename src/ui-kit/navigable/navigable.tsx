import { Link } from 'react-router-dom';
import styles from './navigable.module.css';

export function Navigable(props: React.PropsWithChildren<any>) {
	return (
		<Link className={styles.navigable} to={props.to}>
			{props.children}
		</Link>
	);
}
