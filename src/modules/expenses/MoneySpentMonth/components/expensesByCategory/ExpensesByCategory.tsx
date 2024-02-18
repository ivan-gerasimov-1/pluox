import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import { getCategoryName } from '@domain/categories/getCategoryName';
import { Expenses } from '@domain/expenses';
import styles from './ExpensesByCategory.module.css';
import { CategoryIcon } from '@uiKit/categoryIcon/categoryIcon';

export function ExpensesByCategory() {
	let expenses = Expenses.getInstance().getMonthlyExpensesByCategory();

	return (
		<>
			{expenses.map(({ id, total }) => {
				return (
					<div key={id} className={styles.categoryRow}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<div style={{ marginRight: '10px' }}>
								<CategoryIcon categoryId={id} />
							</div>

							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<span style={{ fontWeight: 600 }}>{getCategoryName(id)}</span>

								<span style={{ fontSize: '12px', opacity: 0.75 }}>25.5%</span>
							</div>
						</div>

						<div>
							<span style={{ fontWeight: 600 }}>
								{IntlService.getInstance().formatCurrency(total)}
							</span>
						</div>
					</div>
				);
			})}
		</>
	);
}
