import { EAppPath } from '@root/app-path';
import { appI18n } from '@components/app/app.i18n';
import { useIntl } from '@modules/intl';
import { ErrorScreen, MainScreen } from '@screens/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@root/root.css';
import styles from './app.module.css';
import { AppConfigContext } from '@modules/appConfig/AppConfigContext';
import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';
import { ExpenseListMonthlyScreen } from '@screens/expenseListMonthly';
import { ExpenseListScreen } from '@screens/expense-list';

export function App() {
	let intl = useIntl(appI18n);

	const appConfig = AppConfig.getInstance();

	return (
		<AppConfigContext.Provider value={appConfig}>
			<Router>
				<div className={styles.content}>
					<Routes>
						<Route path={EAppPath.MAIN} element={<MainScreen />} />
						<Route
							path={EAppPath.EXPENSE_LIST}
							element={<ExpenseListScreen />}
						/>
						<Route
							path={EAppPath.EXPENSE_LIST_MONTHLY}
							element={<ExpenseListMonthlyScreen />}
						/>

						<Route
							path="*"
							element={
								<ErrorScreen
									message={intl.translate('errorMessages').pageNotFound}
								/>
							}
						/>
					</Routes>
				</div>
			</Router>
		</AppConfigContext.Provider>
	);
}
