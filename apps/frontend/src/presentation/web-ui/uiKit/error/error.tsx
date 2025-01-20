import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import { errorI18n } from '@root/presentation/web-ui/uiKit/error/error.i18n';

import styles from './error.module.css';

type TErrorProps = {
	title: string;
	message: string;
};

export function Error(props: TErrorProps) {
	const intl = useIntl(errorI18n);
	const navigation = useAppNavigation();

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
