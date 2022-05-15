import { useIntl } from '@modules/intl';
import { addSpendingI18n } from '@modules/spendings/add-spending/add-spending.i18n';
import { Icon } from '@ui-kit/icon';
import { Link } from 'react-router-dom';
import styles from './add-spending.module.css';

export function AddSpending() {
	let intl = useIntl(addSpendingI18n);

	return (
		<div className={styles.wrapper}>
			<Link className={styles.action} to="/add" title={intl.translate('title')}>
				<span className={styles.iconWrapper}>
					<Icon name={Icon.IconName.Add} />
				</span>
			</Link>
		</div>
	);
}
