import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

import { TMonth } from '@domain/amount/useCases/types';
import { getCategoryName } from '@domain/categories/getCategoryName';

import { useToggle } from '@root/presentation/web-ui/hooks/useToggle';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { expensesByCategoryI18n } from '@root/presentation/web-ui/modules/expenses/MoneySpentMonth/components/expensesByCategory/expensesByCategory.i18n';

import { CategoryIcon } from '@root/presentation/web-ui/uiKit/categoryIcon/categoryIcon';

import styles from './ExpensesByCategory.module.css';

export type TExpensesByCategory = {
	className?: string;
	month: TMonth;
};

export function ExpensesByCategory(props: TExpensesByCategory) {
	let intl = useIntl(expensesByCategoryI18n);
	let { state: showAll, toggle: toggleShowAll } = useToggle(false);

	let intlService = useService(EServiceToken.INTL_SERVICE);
	let expenseRepository = useService(EServiceToken.EXPENSE_REPOSITORY);

	let expenses = expenseRepository.getMonthlyExpensesByCategory(props.month);
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
								{intlService.formatCurrency(total)}
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

						toggleShowAll();
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
