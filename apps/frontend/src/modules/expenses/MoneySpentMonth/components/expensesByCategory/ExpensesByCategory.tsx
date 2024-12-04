import { useState } from 'react';

import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import { useIntl } from '@modules/intl/useIntl';

import { TMonth } from '@domain/amount/useCases/types';
import { getCategoryName } from '@domain/categories/getCategoryName';
import { Expenses } from '@domain/expenses/expenses';
import { expensesByCategoryI18n } from '@modules/expenses/MoneySpentMonth/components/expensesByCategory/expensesByCategory.i18n';

import { CategoryIcon } from '@uiKit/categoryIcon/categoryIcon';

import styles from './ExpensesByCategory.module.css';

export type TExpensesByCategory = {
	className?: string;
	month: TMonth;
};

export function ExpensesByCategory(props: TExpensesByCategory) {
	let intl = useIntl(expensesByCategoryI18n);
	let [showAll, setShowAll] = useState<boolean>(false);

	let expenses = Expenses.getInstance().getMonthlyExpensesByCategory(
		props.month,
	);
	let expensesToRender = showAll ? expenses : expenses.slice(0, 3);
	let showMoreButton = expenses.length >= 4;

	return (
		<div className={props.className}>
			{expensesToRender.map(({ id, total, percentage }) => {
				return (
					<div key={id} className={styles.categoryRow}>
						<div className={styles.categoryContainer}>
							<div className={styles.categoryIcon}>
								<CategoryIcon categoryId={id} />
							</div>

							<div className={styles.categoryInfo}>
								<span className={styles.categoryName}>
									{getCategoryName(id)}
								</span>

								<span className={styles.categoryPercentage}>
									{percentage.toFixed(1)}%
								</span>
							</div>
						</div>

						<div>
							<span className={styles.categoryTotalAmount}>
								{IntlService.getInstance().formatCurrency(total)}
							</span>
						</div>
					</div>
				);
			})}

			{showMoreButton && (
				<button
					type="button"
					className={styles.showMoreButton}
					onClick={(event) => {
						event.preventDefault();

						setShowAll(!showAll);
					}}
				>
					{showAll
						? intl.translate('hideButton')
						: intl.translate('showButton')}
				</button>
			)}
		</div>
	);
}
