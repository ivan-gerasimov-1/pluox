import { useQuery } from '@tanstack/react-query';

import { cls } from '@root/presentation/web-ui/utils/classnames';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { EAppPath } from '@root/presentation/web-ui/appPath';

import {
	EXPENSES_QUERY_DAILY_AMOUNT,
	EXPENSES_QUERY_MONTHLY_AMOUNT,
	EXPENSES_QUERY_MONTHLY_TOTAL_BY_CATEGORY,
	getDailyAmount,
	getMonthlyAmount,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import {
	APP_CONFIG_QUERY_BUDGET,
	getBudget,
} from '@root/presentation/web-ui/modules/settings/appConfig.query';

import { ExpenseNew } from '@root/presentation/web-ui/modules/expenses/components/expenseNew/addExpense';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { ActionSheet } from '@root/presentation/web-ui/uiKit/actionSheet/actionSheet';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { ScreenBody } from '@root/presentation/web-ui/uiKit/screen/screenBody';

import styles from './main.module.css';

function useMonthlyAmount(): number {
	let temporal = useService(EServiceToken.TEMPORAL);

	let currentMonth = temporal.getCurrentMonth();

	let { data = 0 } = useQuery({
		queryKey: [EXPENSES_QUERY_MONTHLY_AMOUNT, currentMonth],
		queryFn: () => getMonthlyAmount(currentMonth),
		refetchOnMount: false,
	});

	return data;
}

function useDailyAmount(): number {
	let { data = 0 } = useQuery({
		queryKey: [EXPENSES_QUERY_DAILY_AMOUNT],
		queryFn: getDailyAmount,
		refetchOnMount: false,
	});

	return data;
}

function useMonthlyTotalByCategory() {
	let temporal = useService(EServiceToken.TEMPORAL);
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);

	let currentMonth = temporal.getCurrentMonth();

	let { data = [] } = useQuery({
		queryKey: [EXPENSES_QUERY_MONTHLY_TOTAL_BY_CATEGORY, currentMonth],
		queryFn: () => {
			return expenseService.getMonthlyTotalByCategory(currentMonth);
		},
		refetchOnMount: false,
	});

	return data;
}

function useBudget(): number {
	let { data = 0 } = useQuery({
		queryKey: [APP_CONFIG_QUERY_BUDGET],
		queryFn: getBudget,
	});

	return data;
}

export function useScreenLoader() {
	let temporal = useService(EServiceToken.TEMPORAL);

	let monthlyTotal = useMonthlyAmount();
	let dailyTotal = useDailyAmount();
	let budget = useBudget();

	let categories = useMonthlyTotalByCategory();

	let leftover = budget - monthlyTotal;

	let today = temporal.format({
		format: 'MMMM, YYYY',
	});

	return {
		categories,
		monthlyTotal,
		dailyTotal,
		leftover,
		today,
	};
}

export function MainScreen() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let { categories, monthlyTotal, dailyTotal, leftover, today } =
		useScreenLoader();

	return (
		<>
			<Screen className={styles.screenWithBottomSpace}>
				<Header title={today} />

				<ScreenBody>
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
				</ScreenBody>
			</Screen>

			<ActionSheet>
				<ExpenseNew />
			</ActionSheet>
		</>
	);
}
