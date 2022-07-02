import { EAppPath } from '@root/app-path';
import { appI18n } from '@components/app/app.i18n';
import { useIntl } from '@modules/intl';
import { ExpenseListScreen } from '@root/screens/expense-list/expense-list';
import { ErrorScreen, MainScreen } from '@screens/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@root/root.css';
import styles from './app.module.css';

export function App() {
	let intl = useIntl(appI18n);

	return (
		<Router>
			<div className={styles.content}>
				<Routes>
					<Route path={EAppPath.MAIN} element={<MainScreen />} />
					<Route path={EAppPath.EXPENSE_LIST} element={<ExpenseListScreen />} />

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
	);
}
