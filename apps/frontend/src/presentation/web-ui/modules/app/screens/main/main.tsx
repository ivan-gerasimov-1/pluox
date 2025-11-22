import {
	useExpenseAmountByCategoryQuery,
	useExpenseAmountByDayQuery,
	useExpenseAmountByMonthQuery,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { useAppConfigBudgetQuery } from '@root/presentation/web-ui/modules/settings/queries/appConfig';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './main.module.css';

export function MainScreen() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let monthlyTotal = useExpenseAmountByMonthQuery();
	let dailyTotal = useExpenseAmountByDayQuery();
	let categories = useExpenseAmountByCategoryQuery();

	let budget = useAppConfigBudgetQuery();

	let leftover = budget - monthlyTotal;

	return (
		<>
			<div className="font-bold text-3xl">
				{intlService.formatCurrency(monthlyTotal, {
					hideDecimal: true,
				})}
			</div>

			<div className={styles.cardContainer}>
				<div className={cls(styles.card, '-rotate-z-2')}>
					<div>Сегодня</div>

					<div className="font-mono font-semibold text-base self-end">
						{intlService.formatCurrency(dailyTotal, {
							hideDecimal: true,
						})}
					</div>
				</div>

				<div className={cls(styles.card)}>
					<div>Остаток</div>

					<div className="font-mono font-semibold text-base self-end">
						{intlService.formatCurrency(leftover, {
							hideDecimal: true,
						})}
					</div>
				</div>

				<div className={cls(styles.card, styles.categoryCard)}>
					<div>Категории</div>

					<ul className="gap-3 p-0 font-semibold flex w-full flex-col">
						{categories.map(({ id, total }) => (
							<li key={id} className="start-end flex justify-between">
								<span className="leading-none">
									{categoryService.getCategoryIcon(id)}
								</span>

								<span className={styles.dotFilledSpace}></span>

								<span className="leading-none">
									{intlService.formatCurrency(total, {
										hideDecimal: true,
									})}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export function MainScreenHeader() {
	let temporal = useService(EServiceToken.TEMPORAL);

	let today = temporal.format({
		format: 'MMMM, YYYY',
	});

	return <Header title={today} />;
}
