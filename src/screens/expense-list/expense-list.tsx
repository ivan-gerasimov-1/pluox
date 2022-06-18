import { ExpenseList } from '@modules/expenses';
import { useIntl } from '@modules/intl';
import { expenseListI18n } from '@screens/expense-list/expense-list.i18n';
import styles from './expense-list.module.css';

export function ExpenseListScreen() {
	let intl = useIntl(expenseListI18n);

	return (
		<>
			<div className={styles.header}>
				<h1>{intl.translate('title')}</h1>
			</div>

			<ExpenseList />
		</>
	);
}
