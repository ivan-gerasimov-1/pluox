import { EAppPath } from '@root/appPath';

import { MoneySpentMonth } from '@modules/expenses/MoneySpentMonth';
import { MoneySpentYear } from '@modules/expenses/MoneySpentYear';
import { AddExpense } from '@modules/expenses/addExpense/addExpense';
import { useService } from '@modules/serviceContainer/react/useService';
import { EServiceToken } from '@modules/serviceContainer/types';

import { ActionSheet } from '@root/uiKit/actionSheet';
import { AppLink } from '@uiKit/appLink/appLink';
import { Header } from '@uiKit/header/header';
import { Screen } from '@uiKit/screen/screen';
import { CardContainer } from '@uiKit/cardContainer/cardContainer';
import { Card } from '@uiKit/card/card';

import styles from './main.module.css';

export function MainScreen() {
	let appConfig = useService(EServiceToken.APP_CONFIG);

	return (
		<>
			<Screen className={styles.screenWithBottomSpace}>
				<Header title="Savee" />

				<CardContainer>
					<AppLink to={EAppPath.EXPENSES}>
						<Card touchable>
							<MoneySpentMonth month={appConfig.currentMonth} />
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
