import { Navbar } from '@components/navbar';
import { AppPath } from '@root/app-path';
import { AddSpendingScreen, ErrorScreen, MainScreen } from '@screens/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import { SpendingListScreen } from './screens/spending-list/spending-list';

export function App() {
	return (
		<Router>
			<div className={styles.wrapper}>
				<div className={styles.logoWrapper}>
					<h1 className={styles.logo}>Savee</h1>
				</div>

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
							element={<ErrorScreen message="Page not found" />}
						/>
					</Routes>
				</div>

				<Navbar />
			</div>
		</Router>
	);
}
