import { errorI18n } from '@root/presentation/web-ui/uiKit/error/error.i18n';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { useNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import styles from './error.module.css';

type TErrorProps = {
	title: string;
	message: string;
};

export function Error(props: TErrorProps) {
	const intl = useIntl(errorI18n);
	const navigation = useNavigation();

	return (
		<>
			<h1 className={styles.header}>{props.title}</h1>

			<h2 className={styles.message}>{props.message}</h2>

			<Button className={styles.button} onClick={navigation.mainPage}>
				{intl.translate('mainPageButtonLabel')}
			</Button>
		</>
	);
}
