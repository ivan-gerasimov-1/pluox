import { EAppPath } from '@root/presentation/web-ui/appPath';

import { MoneySpentMonth } from '@root/presentation/web-ui/modules/expenses/MoneySpentMonth/MoneySpentMonth';
import { MoneySpentYear } from '@root/presentation/web-ui/modules/expenses/MoneySpentYear/MoneySpentYear';
import { AddExpense } from '@root/presentation/web-ui/modules/expenses/addExpense/addExpense';

import { ActionSheet } from '@root/presentation/web-ui/uiKit/actionSheet/actionSheet';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { CardContainer } from '@root/presentation/web-ui/uiKit/cardContainer/cardContainer';
import { Card } from '@root/presentation/web-ui/uiKit/card/card';

import styles from './main.module.css';
import { useQuery } from '@tanstack/react-query';
import {
	getBudget,
	QUERY_APP_CONFIG_BUDGET,
	QUERY_APP_CONFIG_MONTH,
} from '@root/presentation/web-ui/modules/appConfig/appConfig.query';
import { getCurrentMonth } from '@root/core/infrastructure/temporal/helpers';
import { cls } from '@root/presentation/web-ui/utils/classnames';
import {
	QUERY_EXPENSES_DAILY_AMOUNT,
	QUERY_EXPENSES_MONTHLY_AMOUNT,
	getDailyAmount,
	getMonthlyAmount,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { TMonth } from '@root/core/infrastructure/temporal/types';
import { ECurrency } from '@root/core/modules/currency/domain/types';

function useCurrentMonth(): TMonth {
	let { data } = useQuery({
		queryKey: [QUERY_APP_CONFIG_MONTH],
		queryFn: getCurrentMonth,
	});

	return data as TMonth;
}

function useMonthlyAmount(month: TMonth): number {
	let { data } = useQuery({
		queryKey: [QUERY_EXPENSES_MONTHLY_AMOUNT, month],
		queryFn: () => getMonthlyAmount(month),
		refetchOnMount: false,
	});

	return data as number;
}

function useBudget(): number {
	let { data } = useQuery({
		queryKey: [QUERY_APP_CONFIG_BUDGET],
		queryFn: getBudget,
	});

	return data as number;
}

function useDailyAmount(): number {
	let { data } = useQuery({
		queryKey: [QUERY_EXPENSES_DAILY_AMOUNT],
		queryFn: getDailyAmount,
	});

	return data ?? 0;
}

function useCategories(month: TMonth) {
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getMonthlyExpensesByCategory(month);
}

export function MainScreen() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let currentMonth = useCurrentMonth();
	let monthlyTotal = useMonthlyAmount(currentMonth);
	let dailyTotal = useDailyAmount();
	let budget = useBudget();

	let leftover = budget - monthlyTotal;

	let categories = useCategories(currentMonth);

	return (
		<>
			<Screen className={styles.screenWithBottomSpace}>
				<Header title="Savee" />

				<div className={styles.title}>
					<span>
						{intlService.formatCurrency(monthlyTotal, {
							hideDecimal: true,
						})}
					</span>
					<span
						style={{
							color: 'var(--grey-800)',
						}}
					>
						{ECurrency.USD}
					</span>
				</div>

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
										marginBlockEnd: '5px',
									}}
								>
									<div>{categoryService.getCategoryIcon(id)}</div>

									<div>
										{intlService.formatCurrency(total, {
											hideDecimal: true,
										})}
									</div>
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
