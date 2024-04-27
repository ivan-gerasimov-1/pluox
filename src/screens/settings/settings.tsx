import { useStore } from 'zustand';

import { AuthService } from '@core/infrastructure/authService/AuthService';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { ECurrency } from '@core/infrastructure/currency/types';

import { AppConfigStore } from '@modules/appConfig/appConfig.store';
import { useNavigation } from '@modules/navigation/useNavigation';

import { Screen } from '@uiKit/screen/screen';
import { Header } from '@uiKit/header/header';
import { Button } from '@uiKit/button/button';

import styles from './settings.module.css';
import { Navigable } from '@uiKit/navigable/navigable';
import { EAppPath } from '@root/appPath';

export function Settings() {
	let navigation = useNavigation();
	let appConfigStore = AppConfigStore.getInstance();
	let appConfigState = useStore(appConfigStore.get());

	return (
		<Screen>
			<Header title="Настройки" />

			<div>
				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>Пользователь</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Имя:</span> —
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Эл. почта:</span> —
					</div>
				</div>

				<div className={styles.section}>
					<Navigable to={EAppPath.CATEGORIES}>Категории →</Navigable>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>Приложение</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Язык:</span>
						<select
							name="locale"
							id="locale"
							value={appConfigState.locale}
							onChange={(event) => {
								const locale = event.target.value as ELocaleCode;

								appConfigStore.set({ locale });
							}}
						>
							<option key={ELocaleCode.RU_RU} value={ELocaleCode.RU_RU}>
								Русский
							</option>
							<option key={ELocaleCode.EN_US} value={ELocaleCode.EN_US}>
								English
							</option>
						</select>
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Валюта:</span>{' '}
						<select
							name="currency"
							id="currency"
							value={appConfigState.currency}
							onChange={(event) => {
								appConfigStore.set({
									currency: event.target.value as ECurrency,
								});
							}}
						>
							{Object.values(ECurrency).map((currency) => {
								return (
									<option key={currency} value={currency}>
										{currency}
									</option>
								);
							})}
						</select>
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Доступные валюты:</span>{' '}
						{appConfigState.availabelCurrencies.join(', ')}
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Бюджет:</span>
						<input
							type="number"
							value={appConfigState.budget || 0}
							onChange={(event) => {
								const budget = Number.parseInt(event.target.value);

								appConfigStore.set({ budget });
							}}
						/>
						<span> {appConfigState.currency}</span>
					</div>
				</div>
			</div>

			<div>
				<Button
					style={{ width: '100%' }}
					onClick={() => {
						if (!window.confirm('Вы уверены, что хотите выйти?')) {
							return;
						}

						AuthService.getInstance().signOut();

						navigation.mainPage();
					}}
				>
					Выйти
				</Button>
			</div>
		</Screen>
	);
}
