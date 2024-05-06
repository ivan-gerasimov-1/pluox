import { useStore } from 'zustand';

import { cls } from '@utils/classnames';

import { EAppPath } from '@root/appPath';

import { AuthService } from '@core/infrastructure/authService/AuthService';
import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';

import { useIntl } from '@modules/intl/useIntl';
import { AppConfigStore } from '@modules/appConfig/appConfig.store';
import { useNavigation } from '@modules/navigation/useNavigation';

import { Button } from '@uiKit/button/button';
import { Header } from '@uiKit/header/header';
import { Screen } from '@uiKit/screen/screen';
import { Navigable } from '@uiKit/navigable/navigable';
import { Select } from '@uiKit/select/select';

import { settingsI18n } from '@screens/settings/settings.i18n';

import styles from './settings.module.css';

export function Settings() {
	let intl = useIntl(settingsI18n);
	let navigation = useNavigation();
	let appConfigStore = AppConfigStore.getInstance();
	let appConfigState = useStore(appConfigStore.get());

	return (
		<Screen>
			<Header title={intl.translate('screenTitle')} />

			<div>
				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>
						{intl.translate('userSectionTitle')}
					</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>
							{intl.translate('userName')}
						</span>
						<span>—</span>
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>
							{intl.translate('userEmail')}
						</span>
						<span>—</span>
					</div>

					<hr className={styles.separator} />

					<div className={cls(styles.field, styles.sectionActionsContainer)}>
						<div style={{ width: '100%' }} />

						<Button
							onClick={() => {
								if (!window.confirm(intl.translate('exitConfirmation'))) {
									return;
								}

								AuthService.getInstance().signOut();

								navigation.mainPage();
							}}
						>
							{intl.translate('exitButton')}
						</Button>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>
						{intl.translate('appSectionTitle')}
					</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>
							{intl.translate('appLanguage')}
						</span>

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
					<h2 className={styles.sectionHeader}>
						{intl.translate('currencySectionTitle')}
					</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>
							'{intl.translate('currencyMain')}'
						</span>

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
						<span className={styles.fieldLabel}>
							{intl.translate('currencyAvailable')}
						</span>
						<span className={styles.currencies}>
							{appConfigState.availabelCurrencies.join(', ')}
						</span>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>
						{intl.translate('budgetSectionTitle')}
					</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>
							{intl.translate('budgetLabel')}
						</span>

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
					<h2 className={styles.sectionHeader}>
						{intl.translate('categoriesSectionTitle')}
					</h2>

					<div className={styles.field}>
						<Navigable to={EAppPath.CATEGORIES} className={styles.categories}>
							<span>{intl.translate('categoriesLabel')}</span>
							<span>→</span>
						</Navigable>
					</div>
				</div>
			</div>
		</Screen>
	);
}
