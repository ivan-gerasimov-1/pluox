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
import { QUERY_APP_CONFIG_MONTH } from '@root/presentation/web-ui/modules/appConfig/appConfig.query';
import { getCurrentMonth } from '@root/core/infrastructure/temporal/helpers';

export function MainScreen() {
	let { data: currentMonth } = useQuery({
		queryKey: [QUERY_APP_CONFIG_MONTH],
		queryFn: getCurrentMonth,
	});

	return (
		<>
			<Screen className={styles.screenWithBottomSpace}>
				<Header title="Savee" />

				<CardContainer>
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
				</CardContainer>
			</Screen>

			<ActionSheet>
				<AddExpense />
			</ActionSheet>
		</>
	);
}
