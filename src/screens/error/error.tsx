import styles from './error.module.css';
import { Error } from '@components/error';

interface IErrorScreen {
	title?: string;
	message: string;
}

export function ErrorScreen({ title = 'Error', ...props }: IErrorScreen) {
	return (
		<div className={styles.error}>
			<Error title={title} message={props.message} />
		</div>
	);
}
