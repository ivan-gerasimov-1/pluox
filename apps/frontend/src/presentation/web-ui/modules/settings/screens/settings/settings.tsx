import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { cls } from '@root/presentation/web-ui/utils/classnames';

import {
	ECurrency,
	type TCurrency,
} from '@root/core/modules/currency/domain/types';
import { getLanguageNameByLocale } from '@root/core/modules/intl/application/helpers';
import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { TUserUpdateDTO } from '@root/core/modules/user/application/dto/userDTO';
import {
	APP_CONFIG_QUERY,
	getAppConfig,
	updateAppConfig,
} from '@root/presentation/web-ui/modules/settings/appConfig.query';
import {
	getUser,
	updateUser,
	USER_QUERY_BY_ID,
} from '@root/presentation/web-ui/modules/settings/settings.query';
import { useVenueListQuery } from '@root/presentation/web-ui/modules/venues/venues.query';

import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { ScreenBody } from '@root/presentation/web-ui/uiKit/screen/screenBody';

import { settingsI18n } from '@root/presentation/web-ui/modules/settings/screens/settings/settings.i18n';

import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';
import { Card } from '@root/presentation/web-ui/uiKit/card/card';
import { CardContainer } from '@root/presentation/web-ui/uiKit/cardContainer/cardContainer';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@root/presentation/web-ui/uiKit/iconButton/iconButton';
import { IconSelect } from '@root/presentation/web-ui/uiKit/iconSelect/iconSelect';

import styles from './settings.module.css';

/**
 * @todo
 * 1. Don’t refetch *appConfig* on mount
 * 2. Invalidate all related to *appConfig* queries.
 *    For some reason, *appConfig* is not invalidated on mutation if
 *    *queryKey* contains *QUERY_APP_CONFIG_BUDGET*
 */
export function SettingsScreen() {
	let dialog = useDialog();
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let intl = useIntl(settingsI18n);
	let navigation = useAppNavigation();

	let queryClient = useQueryClient();

	let {
		data: user = {
			id: '',
			name: '',
			locale: ELocaleCode.RU_RU,
		},
	} = useQuery({
		queryKey: [USER_QUERY_BY_ID],
		queryFn: getUser,
		// refetchOnMount: false,
	});

	let venueListQuery = useVenueListQuery();

	let { mutate: mutateUser } = useMutation({
		mutationFn: async (userUpdateDTO: TUserUpdateDTO) => {
			updateUser(user.id, userUpdateDTO);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [USER_QUERY_BY_ID],
			});
		},
	});

	let {
		data: appConfig = {
			locale: ELocaleCode.EN_US,
			budget: null,
			currency: ECurrency.USD,
			availabelCurrencies: [ECurrency.USD, ECurrency.EUR],
		},
	} = useQuery({
		queryKey: [APP_CONFIG_QUERY],
		queryFn: getAppConfig,
		// refetchOnMount: false,
	});

	let { mutate: mutateAppConfig } = useMutation({
		mutationFn: async (payload: Partial<TAppConfig>) => {
			updateAppConfig(payload);
		},
		onSuccess: async (data, variables) => {
			let queryKey = [APP_CONFIG_QUERY];

			/** @todo #1 */
			// if (variables.budget !== undefined) {
			// 	queryKey.push(QUERY_APP_CONFIG_BUDGET);
			// }

			await queryClient.invalidateQueries({
				queryKey,
			});
		},
	});

	return (
		<>
			<Screen hasNavbar>
				<Header title={intl.translate('screenTitle')} />

				<ScreenBody>
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

									<span className={styles.fieldValue}>{user.name}</span>
								</div>

								<IconButton
									iconName={EIconName.Edit}
									onClick={() => {
										let actionSheetApi = dialog.render(
											UserNameEditActionSheet,
											{
												userName: user.name,

												close: (payload: { userName: string }) => {
													mutateUser({
														name: payload.userName,
													});

													actionSheetApi.close();
												},
											},
										);
									}}
								/>
							</div>

							<div className={styles.field}>
								<div className={styles.fieldData}>
									<span className={styles.fieldLabel}>
										{intl.translate('userAccount')}
									</span>

									<span className={styles.fieldValue}>—</span>
								</div>

								<div className={styles.fieldAction}>
									<Button
										size="s"
										onClick={() => {
											navigation.loginPage();
										}}
									>
										{intl.translate('loginButton')}
									</Button>
								</div>
							</div>

							{/* Temporarily disabled */}
							{/* <Separator />

						<div className={cls(styles.field, styles.sectionActionsContainer)}>
							<div style={{ width: '100%' }} />

							<Button
								size="s"
								onClick={() => {
									if (!window.confirm(intl.translate('exitConfirmation'))) {
										return;
									}

									authService.logOut();

									navigation.mainPage();
								}}
							>
								{intl.translate('exitButton')}
							</Button>
						</div> */}
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
										{getLanguageNameByLocale(appConfig.locale)}
									</span>
								</div>

								<IconSelect
									id="locale"
									name="locale"
									icon={EIconName.CaretDown}
									value={appConfig.locale}
									onChange={(locale) => {
										mutateAppConfig({
											locale,
										});

										mutateUser({
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
										{appConfig.currency}
									</span>
								</div>

								<IconSelect
									id="currency"
									name="currency"
									icon={EIconName.CaretDown}
									value={appConfig.currency}
									onChange={(currency) => {
										mutateAppConfig({
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

									<div
										className={cls(styles.fieldValue, styles.pillsContainer)}
									>
										{appConfig.availabelCurrencies.map((currency) => {
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
										{appConfig.currency}
									</span>

									<span className={styles.fieldValue}>
										{intlService.formatCurrency(appConfig.budget || 0)}
									</span>
								</div>

								<IconButton
									iconName={EIconName.Edit}
									onClick={() => {
										let actionSheetApi = dialog.render(BudgetEditActionsSheet, {
											budget: appConfig.budget ?? 0,
											currency: appConfig.currency,

											close: (payload: { budget: number }) => {
												mutateAppConfig({
													budget: payload.budget,
												});

												actionSheetApi.close();
											},
										});
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
									<div
										className={cls(styles.fieldValue, styles.pillsContainer)}
									>
										{categoryTemplates.map((category) => {
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

						<Card>
							<h2 className={styles.sectionHeader}>
								{intl.translate('venuesSectionTitle')}
							</h2>

							<div className={styles.field}>
								<div className={styles.fieldData}>
									<div
										className={cls(styles.fieldValue, styles.pillsContainer)}
									>
										{venueListQuery.map((venue) => {
											return (
												<span key={venue.id} className={styles.pill}>
													{venue.name}
												</span>
											);
										})}
									</div>
								</div>

								<IconButton
									iconName={EIconName.Settings}
									onClick={() => {
										navigation.venueListPage();
									}}
								/>
							</div>
						</Card>
					</CardContainer>

					<Button onClick={() => dialog.render(TestModal)}>Open Modal</Button>
					<Button onClick={() => dialog.render(AuthTestModal)}>
						Check Auth
					</Button>
				</ScreenBody>
			</Screen>
		</>
	);
}

export function UserNameEditActionSheet(
	props: TDialogComponentProps<
		{
			userName: string;
		},
		{
			userName: string;
		}
	>,
) {
	let intl = useIntl(settingsI18n);
	let [userName, setUserName] = useState(props.userName);

	return (
		<>
			<div className={styles.budgetContainer}>
				<input
					type="text"
					className={styles.budgetInput}
					value={userName}
					onChange={(event) => {
						let userName = event.target.value;

						setUserName(userName);
					}}
				/>
			</div>

			<Button
				style={{
					marginTop: '20px',
				}}
				onClick={() => {
					props.close({
						userName,
					});
				}}
				isWide
			>
				{intl.translate('save')}
			</Button>
		</>
	);
}

export function BudgetEditActionsSheet(
	props: TDialogComponentProps<
		{
			budget: number;
			currency: TCurrency;
		},
		{
			budget: number;
		}
	>,
) {
	let intl = useIntl(settingsI18n);
	let [budget, setBudget] = useState(props.budget);

	return (
		<>
			<div className={styles.budgetContainer}>
				<span className={styles.budgetCurrency}>{props.currency}</span>

				<input
					type="number"
					className={styles.budgetInput}
					value={budget ?? 0}
					onChange={(event) => {
						let budget = Number.parseInt(event.target.value);

						setBudget(budget);
					}}
				/>
			</div>

			<Button
				style={{
					marginTop: '20px',
				}}
				onClick={() => {
					props.close({
						budget,
					});
				}}
				isWide
			>
				{intl.translate('save')}
			</Button>
		</>
	);
}

function TestModal(props: { id: string; close: () => void }) {
	return (
		<>
			Modal: {props.id}
			<br />
			<br />
			<Button onClick={props.close} isWide>
				Close
			</Button>
		</>
	);
}

function AuthTestModal(props: { id: string; close: () => void }) {
	let apiClient = useService(EServiceToken.API_CLIENT);
	let [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	return (
		<>
			Is Authenticated:{' '}
			{isAuthenticated === null ? '?' : isAuthenticated.toString()}
			<br />
			<br />
			<Button
				onClick={async () => {
					try {
						let response = await apiClient.get('/users/me');
						if (response) {
							setIsAuthenticated(true);
						}
					} catch {
						setIsAuthenticated(false);
					}
				}}
				isWide
			>
				Check
			</Button>
			<br />
			<br />
			<Button onClick={props.close} isWide>
				Close
			</Button>
		</>
	);
}
