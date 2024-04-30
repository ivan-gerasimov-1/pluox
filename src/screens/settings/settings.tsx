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
import { cls } from '@utils/classnames';
import { Select } from '@uiKit/select/select';

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
						<span className={styles.fieldLabel}>Имя</span>
						<span>—</span>
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Почта</span>
						<span>—</span>
					</div>

					<hr className={styles.separator} />

					<div className={cls(styles.field, styles.sectionActionsContainer)}>
						<div style={{ width: '100%' }} />

						<Button
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
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>Приложение</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Язык</span>

						<Select
							name="locale"
							id="locale"
							value={appConfigState.locale}
							onChange={(locale) => {
								appConfigStore.set({ locale });
							}}
							options={[
								{
									key: ELocaleCode.RU_RU,
									value: ELocaleCode.RU_RU,
									label: 'Русский',
								},
								{
									key: ELocaleCode.EN_US,
									value: ELocaleCode.EN_US,
									label: 'English',
								},
							]}
						/>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>Валюта</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Основная валюта</span>

						<Select
							name="currency"
							id="currency"
							value={appConfigState.currency}
							onChange={(value) => {
								appConfigStore.set({ currency: value });
							}}
							options={Object.values(ECurrency).map((currencyCode) => {
								return {
									key: currencyCode,
									value: currencyCode,
									label: currencyCode,
								};
							})}
						/>
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Доступные валюты</span>
						<span className={styles.currencies}>
							{appConfigState.availabelCurrencies.join(', ')}
						</span>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>Бюджет</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Бюджет</span>

						<div className={styles.budgetContainer}>
							<span className={styles.budgetCurrency}>
								{appConfigState.currency}
							</span>

							<input
								type="number"
								className={styles.budgetInput}
								value={appConfigState.budget || 0}
								onChange={(event) => {
									const budget = Number.parseInt(event.target.value);

									appConfigStore.set({ budget });
								}}
							/>
						</div>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>Категории</h2>

					<div className={styles.field}>
						<Navigable to={EAppPath.CATEGORIES} className={styles.categories}>
							<span>Категории</span>
							<span>→</span>
						</Navigable>
					</div>
				</div>
			</div>
		</Screen>
	);
}
