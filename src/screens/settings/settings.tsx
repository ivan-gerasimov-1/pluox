import { useStore } from 'zustand';

import { cls } from '@utils/classnames';

import { AuthService } from '@core/infrastructure/authService/AuthService';
import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { getLanguageNameByLocale } from '@core/infrastructure/intl/helpers';

import { useIntl } from '@modules/intl/useIntl';
import { AppConfigStore } from '@modules/appConfig/appConfig.store';
import { useNavigation } from '@modules/navigation/useNavigation';

import { Button } from '@uiKit/button/button';
import { Header } from '@uiKit/header/header';
import { Screen } from '@uiKit/screen/screen';

import { settingsI18n } from '@screens/settings/settings.i18n';

import styles from './settings.module.css';
import { IconSelect } from '@uiKit/iconSelect/iconSelect';
import { EIconName } from '@uiKit/icon/icons';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import { IconButton } from '@uiKit/iconButton/iconButton';
import { categoryList } from '@domain/categories/constants';

export function Settings() {
	let intl = useIntl(settingsI18n);
	let navigation = useNavigation();
	let appConfigStore = AppConfigStore.getInstance();
	let appConfigState = useStore(appConfigStore.get());
	let intlService = IntlService.getInstance();

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
						<div className={styles.fieldData}>
							<span className={styles.fieldLabel}>
								{intl.translate('appLanguage')}
							</span>

							<span className={styles.fieldValue}>
								{getLanguageNameByLocale(appConfigState.locale)}
							</span>
						</div>

						<IconSelect
							id="locale"
							name="locale"
							icon={EIconName.CaretDown}
							value={appConfigState.locale}
							onChange={(locale) => {
								appConfigStore.set({
									locale,
								});
							}}
							options={[
								{
									value: ELocaleCode.RU_RU,
									label: 'Русский',
								},
								{
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
						<div className={styles.fieldData}>
							<span className={styles.fieldLabel}>
								{intl.translate('currencyMain')}
							</span>

							<span className={styles.fieldValue}>
								{appConfigState.currency}
							</span>
						</div>

						<IconSelect
							id="currency"
							name="currency"
							icon={EIconName.CaretDown}
							value={appConfigState.currency}
							onChange={(currency) => {
								appConfigStore.set({
									currency,
								});
							}}
							options={Object.values(ECurrency).map((currency) => {
								return {
									value: currency,
									label: currency,
								};
							})}
						/>
					</div>

					<div className={styles.field}>
						<div className={styles.fieldData}>
							<span className={styles.fieldLabel}>
								{intl.translate('currencyAvailable')}
							</span>

							<div className={cls(styles.fieldValue, styles.currencyContainer)}>
								{appConfigState.availabelCurrencies.map((currency) => {
									return (
										<span key={currency} className={styles.currency}>
											{currency}
										</span>
									);
								})}
							</div>
						</div>

						<IconButton
							iconName={EIconName.Settings}
							onClick={() => {
								window.alert('Not Implemented');
							}}
						/>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>
						{intl.translate('budgetSectionTitle')}
					</h2>

					<div className={styles.field}>
						<div className={styles.fieldData}>
							<span className={styles.fieldLabel}>
								{appConfigState.currency}
							</span>

							<span className={styles.fieldValue}>
								{intlService.formatCurrency(appConfigState.budget || 0)}
							</span>
						</div>

						<IconButton
							iconName={EIconName.Edit}
							onClick={() => {
								window.alert('Not Implemented');
							}}
						/>

						{/* <div className={styles.budgetContainer}>
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
						</div> */}
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>
						{intl.translate('categoriesSectionTitle')}
					</h2>

					<div className={styles.field}>
						<div className={styles.fieldData}>
							<div className={cls(styles.fieldValue, styles.currencyContainer)}>
								{categoryList.map((category) => {
									return (
										<span key={category.id} className={styles.currency}>
											{category.name}
										</span>
									);
								})}
							</div>
						</div>

						<IconButton
							iconName={EIconName.Settings}
							onClick={() => {
								window.alert('Not Implemented');
							}}
						/>
					</div>
				</div>
			</div>
		</Screen>
	);
}
