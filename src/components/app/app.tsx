import { EAppPath } from '@root/app-path';
import { appI18n } from '@components/app/app.i18n';
import { useIntl } from '@modules/intl';
import { SpendingListScreen } from '@root/screens/spending-list/spending-list';
import { AddSpendingScreen, ErrorScreen, MainScreen } from '@screens/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';

export function App() {
	let intl = useIntl(appI18n);

	return (
		<Router>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<Routes>
						<Route path={EAppPath.MAIN} element={<MainScreen />} />
						<Route
							path={EAppPath.ADD_SPENDING}
							element={<AddSpendingScreen />}
						/>
						<Route
							path={EAppPath.SPENDING_LIST}
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
			</div>
		</Router>
	);
}
