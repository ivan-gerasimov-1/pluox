import { Error } from '@components/error';
import { useIntl } from '@modules/intl/useIntl';
import { errorScreenI18n } from '@root/screens/error/error.i18n';
import styles from './error.module.css';

type TErrorScreenProps = {
	title?: string;
	message: string;
};

export function ErrorScreen(props: TErrorScreenProps) {
	let intl = useIntl(errorScreenI18n);

	return (
		<div className={styles.error}>
			<Error
				title={props.title || intl.translate('defaultTitle')}
				message={props.message}
			/>
		</div>
	);
}
