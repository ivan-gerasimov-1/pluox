import { Navbar } from '@components/navbar';
import { useIntl } from '@modules/intl';
import { AppPath } from '@root/app-path';
import { appI18n } from '@root/app.i18n';
import { AddSpendingScreen, ErrorScreen, MainScreen } from '@screens/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import { SpendingListScreen } from './screens/spending-list/spending-list';

export function App() {
	let intl = useIntl(appI18n);

	return (
		<Router>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<Routes>
						<Route path={AppPath.MAIN} element={<MainScreen />} />
						<Route
							path={AppPath.ADD_SPENDING}
							element={<AddSpendingScreen />}
						/>
						<Route
							path={AppPath.SPENDING_LIST}
							element={<SpendingListScreen />}
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

				<Navbar />
			</div>
		</Router>
	);
}
