import { useQuery } from '@tanstack/react-query';

import { cls } from '@root/presentation/web-ui/utils/classnames';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { EAppPath } from '@root/presentation/web-ui/appPath';

import {
	getBudget,
	APP_CONFIG_QUERY_BUDGET,
} from '@root/presentation/web-ui/modules/settings/appConfig.query';
import {
	getDailyAmount,
	getMonthlyAmount,
	EXPENSES_QUERY_DAILY_AMOUNT,
	EXPENSES_QUERY_MONTHLY_AMOUNT,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';

import { AddExpense } from '@root/presentation/web-ui/modules/expenses/addExpense/addExpense';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { ActionSheet } from '@root/presentation/web-ui/uiKit/actionSheet/actionSheet';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

import styles from './main.module.css';

function useMonthlyAmount(): number {
	let temporal = useService(EServiceToken.TEMPORAL);

	let currentMonth = temporal.getCurrentMonth();

	let { data } = useQuery({
		queryKey: [EXPENSES_QUERY_MONTHLY_AMOUNT, currentMonth],
		queryFn: () => getMonthlyAmount(currentMonth),
		refetchOnMount: false,
	});

	return data as number;
}

function useBudget(): number {
	let { data } = useQuery({
		queryKey: [APP_CONFIG_QUERY_BUDGET],
		queryFn: getBudget,
	});

	return data as number;
}

function useDailyAmount(): number {
	let { data } = useQuery({
		queryKey: [EXPENSES_QUERY_DAILY_AMOUNT],
		queryFn: getDailyAmount,
	});

	return data ?? 0;
}

function useCategories() {
	let temporal = useService(EServiceToken.TEMPORAL);
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);

	let currentMonth = temporal.getCurrentMonth();

	return expenseService.getMonthlyTotalByCategory(currentMonth);
}

export function MainScreen() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let categories = useCategories();

	let monthlyTotal = useMonthlyAmount();
	let dailyTotal = useDailyAmount();
	let budget = useBudget();

	let leftover = budget - monthlyTotal;

	return (
		<>
			<Screen className={styles.screenWithBottomSpace}>
				<Header title="Savee" />

				<AppLink to={EAppPath.EXPENSES}>
					<div className={styles.title}>
						<span>
							{intlService.formatCurrency(monthlyTotal, {
								hideDecimal: true,
							})}
						</span>
					</div>
				</AppLink>

				<div className={styles.cardContainer}>
					<div className={cls(styles.card, styles.todayCard)}>
						<div>Сегодня</div>

						<div
							style={{
								marginBlockStart: '5px',
								fontWeight: 'var(--fw-200)',
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

				{/* <CardContainer>
					<AppLink to={EAppPath.EXPENSES}>
						<Card touchable>
							<MoneySpentMonth month={currentMonth ?? 0} />
						</Card>
					</AppLink>

					<AppLink to={EAppPath.EXPENSES_LIST_MONTHLY}>
						<Card touchable>
							<MoneySpentYear />
						</Card>
					</AppLink>
				</CardContainer> */}
			</Screen>

			<ActionSheet>
				<AddExpense />
			</ActionSheet>
		</>
	);
}
