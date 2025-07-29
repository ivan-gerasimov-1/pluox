import { cls } from '@root/presentation/web-ui/utils/classnames';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import {
	useExpenseAmountByDayQuery,
	useExpenseAmountByMonthQuery,
	useExpenseAmountByCategoryQuery,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { useAppConfigBudgetQuery } from '@root/presentation/web-ui/modules/settings/queries/appConfig';

import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';

import styles from './main.module.css';

export function useScreenLoader() {
	let monthlyTotal = useExpenseAmountByMonthQuery();
	let dailyTotal = useExpenseAmountByDayQuery();
	let budget = useAppConfigBudgetQuery();

	let categories = useExpenseAmountByCategoryQuery();

	let leftover = budget - monthlyTotal;

	return {
		categories,
		monthlyTotal,
		dailyTotal,
		leftover,
	};
}

export function MainScreen() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let { categories, monthlyTotal, dailyTotal, leftover } = useScreenLoader();

	return (
		<>
			<div className={styles.title}>
				<span>
					{intlService.formatCurrency(monthlyTotal, {
						hideDecimal: true,
					})}
				</span>
			</div>

			<div className={styles.cardContainer}>
				<div className={cls(styles.card, styles.todayCard)}>
					<div>Сегодня</div>

					<div
						style={{
							marginBlockStart: '5px',
							fontWeight: 'var(--fw-200)',
							alignSelf: 'flex-end',
							fontFamily: 'monospace',
							fontSize: 'var(--fs-200)',
						}}
					>
						{intlService.formatCurrency(dailyTotal, {
							hideDecimal: true,
						})}
					</div>
				</div>
				<div className={cls(styles.card)}>
					<div>Остаток</div>

					<div
						style={{
							marginBlockStart: '5px',
							fontWeight: 'var(--fw-200)',
							alignSelf: 'flex-end',
							fontFamily: 'monospace',
							fontSize: 'var(--fs-200)',
						}}
					>
						{intlService.formatCurrency(leftover, {
							hideDecimal: true,
						})}
					</div>
				</div>
				<div className={cls(styles.card, styles.categoryCard)}>
					<div>Категории</div>

					<ul
						style={{
							width: '100%',
							padding: 0,
							listStyle: 'none',
							fontWeight: 'var(--fw-200)',
						}}
					>
						{categories.map(({ id, total }) => (
							<li
								key={id}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBlockEnd: '10px',
									alignItems: 'flex-end',
								}}
							>
								<span
									style={{
										lineHeight: 1,
									}}
								>
									{categoryService.getCategoryIcon(id)}
								</span>

								<span className={styles.dotFilledSpace}></span>

								<span
									style={{
										lineHeight: 1,
									}}
								>
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
