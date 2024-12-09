import { useState } from 'react';
import { useStore } from 'zustand';

import { cls } from '@root/presentation/web-ui/utils/classnames';

import { ECurrency } from '@core/infrastructure/currency/types';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { getLanguageNameByLocale } from '@core/infrastructure/intl/helpers';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl';
import { useNavigation } from '@root/presentation/web-ui/hooks/navigation/useNavigation';
import { EServiceToken } from '@modules/serviceContainer/types';
import { useService } from '@modules/serviceContainer/react/useService';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

import { settingsI18n } from '@root/presentation/web-ui/screens/settings/settings.i18n';

import styles from './settings.module.css';
import { IconSelect } from '@root/presentation/web-ui/uiKit/iconSelect/iconSelect';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@root/presentation/web-ui/uiKit/iconButton/iconButton';
import { categoryList } from '@domain/categories/constants';
import { ActionSheet } from '@root/presentation/web-ui/uiKit/actionSheetV2/actionSheet';
import { CardContainer } from '@root/presentation/web-ui/uiKit/cardContainer';
import { Card } from '@root/presentation/web-ui/uiKit/card/card';
import { Separator } from '@root/presentation/web-ui/uiKit/separator/separator';

export function SettingsScreen() {
	let intl = useIntl(settingsI18n);
	let authService = useService(EServiceToken.AUTH_SERVICE);
	let navigation = useNavigation();
	let appConfigStore = useService(EServiceToken.APP_CONFIG_STORE);
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let appConfigState = useStore(appConfigStore.get());

	let [editBudget, setEditBudget] = useState<boolean>(false);

	return (
		<>
			<Screen>
				<Header title={intl.translate('screenTitle')} />

				<CardContainer>
					<Card>
						<h2 className={styles.sectionHeader}>
							{intl.translate('userSectionTitle')}
						</h2>

						<div className={styles.field}>
							<div className={styles.fieldData}>
								<span className={styles.fieldLabel}>
									{intl.translate('userName')}
								</span>

								<span className={styles.fieldValue}>—</span>
							</div>

							<IconButton
								iconName={EIconName.Edit}
								onClick={() => {
									window.alert('Not Implemented');
								}}
							/>
						</div>

						<div className={styles.field}>
							<div className={styles.fieldData}>
								<span className={styles.fieldLabel}>
									{intl.translate('userEmail')}
								</span>

								<span className={styles.fieldValue}>—</span>
							</div>

							<IconButton
								iconName={EIconName.Edit}
								onClick={() => {
									window.alert('Not Implemented');
								}}
							/>
						</div>

						<Separator />

						<div className={cls(styles.field, styles.sectionActionsContainer)}>
							<div style={{ width: '100%' }} />

							<Button
								size="s"
								onClick={() => {
									if (!window.confirm(intl.translate('exitConfirmation'))) {
										return;
									}

									authService.signOut();

									navigation.mainPage();
								}}
							>
								{intl.translate('exitButton')}
							</Button>
						</div>
					</Card>

					<Card>
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
					</Card>

					<Card>
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

								<div className={cls(styles.fieldValue, styles.pillsContainer)}>
									{appConfigState.availabelCurrencies.map((currency) => {
										return (
											<span key={currency} className={styles.pill}>
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
					</Card>

					<Card>
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
									setEditBudget(true);
								}}
							/>
						</div>
					</Card>

					<Card>
						<h2 className={styles.sectionHeader}>
							{intl.translate('categoriesSectionTitle')}
						</h2>

						<div className={styles.field}>
							<div className={styles.fieldData}>
								<div className={cls(styles.fieldValue, styles.pillsContainer)}>
									{categoryList.map((category) => {
										return (
											<span key={category.id} className={styles.pill}>
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
					</Card>
				</CardContainer>
			</Screen>

			<ActionSheet
				onClose={() => setEditBudget(false)}
				isOpen={editBudget}
				height="small"
			>
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

				<Button
					style={{
						marginTop: '20px',
					}}
					onClick={() => {
						setEditBudget(false);
					}}
					size="m"
					isWide
				>
					{intl.translate('save')}
				</Button>
			</ActionSheet>
		</>
	);
}
