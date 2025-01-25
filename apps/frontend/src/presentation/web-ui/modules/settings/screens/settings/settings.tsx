import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { cls } from '@root/presentation/web-ui/utils/classnames';

import { ECurrency } from '@root/core/modules/currency/domain/types';
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

import { useModal } from '@root/presentation/web-ui/modules/app/components/modal/modal';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { ScreenBody } from '@root/presentation/web-ui/uiKit/screen/screenBody';

import { settingsI18n } from '@root/presentation/web-ui/modules/settings/screens/settings/settings.i18n';

import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';
import { ActionSheet } from '@root/presentation/web-ui/uiKit/actionSheetV2/actionSheet';
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
	let modal = useModal();
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

	let [editUserName, setEditUserName] = useState({
		isOpen: false,
		userName: user.name,
	});

	let [editBudgetForm, setEditBudgetForm] = useState({
		isOpen: false,
		budget: appConfig.budget,
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
										setEditUserName({
											isOpen: true,
											userName: user.name,
										});
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
										setEditBudgetForm({
											isOpen: true,
											budget: appConfig.budget,
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

					<Button
						onClick={() => {
							modal.render(function TestModal(props: {
								id: string;
								close: () => void;
							}) {
								console.log(props);
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
							});
						}}
					>
						Open Modal
					</Button>
				</ScreenBody>
			</Screen>

			{/* User name */}
			<ActionSheet
				onClose={() =>
					setEditUserName(() => ({
						isOpen: false,
						userName: user.name,
					}))
				}
				isOpen={editUserName.isOpen}
				height="small"
			>
				<div className={styles.budgetContainer}>
					<input
						type="text"
						className={styles.budgetInput}
						value={editUserName.userName}
						onChange={(event) => {
							let userName = event.target.value;

							setEditUserName((prevState) => ({
								...prevState,
								userName,
							}));
						}}
					/>
				</div>

				<Button
					style={{
						marginTop: '20px',
					}}
					onClick={() => {
						mutateUser({
							name: editUserName.userName,
						});

						setEditUserName((prevState) => {
							return {
								...prevState,
								isOpen: false,
							};
						});
					}}
					size="m"
					isWide
				>
					{intl.translate('save')}
				</Button>
			</ActionSheet>

			{/* Budget  */}
			<ActionSheet
				onClose={() =>
					setEditBudgetForm(() => ({
						isOpen: false,
						budget: appConfig.budget,
					}))
				}
				isOpen={editBudgetForm.isOpen}
				height="small"
			>
				<div className={styles.budgetContainer}>
					<span className={styles.budgetCurrency}>{appConfig.currency}</span>

					<input
						type="number"
						className={styles.budgetInput}
						value={editBudgetForm.budget ?? 0}
						onChange={(event) => {
							const budget = Number.parseInt(event.target.value);

							setEditBudgetForm((prevState) => ({
								...prevState,
								budget,
							}));
						}}
					/>
				</div>

				<Button
					style={{
						marginTop: '20px',
					}}
					onClick={() => {
						mutateAppConfig({
							budget: editBudgetForm.budget,
						});

						setEditBudgetForm((prevState) => {
							return {
								...prevState,
								isOpen: false,
							};
						});
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
