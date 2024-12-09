import { EAppPath } from '@root/presentation/web-ui/appPath';

import { MoneySpentMonth } from '@root/presentation/web-ui/modules/expenses/MoneySpentMonth';
import { MoneySpentYear } from '@root/presentation/web-ui/modules/expenses/MoneySpentYear';
import { AddExpense } from '@root/presentation/web-ui/modules/expenses/addExpense/addExpense';
import { useService } from '@modules/serviceContainer/react/useService';
import { EServiceToken } from '@modules/serviceContainer/types';

import { ActionSheet } from '@root/presentation/web-ui/uiKit/actionSheet';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { CardContainer } from '@root/presentation/web-ui/uiKit/cardContainer/cardContainer';
import { Card } from '@root/presentation/web-ui/uiKit/card/card';

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
