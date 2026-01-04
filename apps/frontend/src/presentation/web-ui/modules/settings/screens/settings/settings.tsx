import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';
import { getLanguageNameByLocale } from '@root/core/modules/intl/application/helpers';

import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@root/presentation/web-ui/modules/settings/queries/appConfig';
import {
	useUserOneByIdQuery,
	useUserUpdateMutation,
} from '@root/presentation/web-ui/modules/settings/queries/user';
import { BudgetEditActionsSheet } from '@root/presentation/web-ui/modules/settings/screens/settings/components/budgetEditActionsSheet/budgetEditActionsSheet';
import { CurrencyActionSheet } from '@root/presentation/web-ui/modules/settings/screens/settings/components/currencyActionSheet/currencyActionSheet';
import { LocaleActionSheet } from '@root/presentation/web-ui/modules/settings/screens/settings/components/localeActionSheet/localeActionSheet';
import { UserNameEditActionSheet } from '@root/presentation/web-ui/modules/settings/screens/settings/components/userNameEditActionSheet/userNameEditActionSheet';
import { settingsI18n } from '@root/presentation/web-ui/modules/settings/screens/settings/settings.i18n';
import { useVenueListUnarchivedQuery } from '@root/presentation/web-ui/modules/venues/queries/venues.query';
import { Badge, Badges } from '@root/presentation/web-ui/uiKit/badge/badge';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import {
	Card,
	CardContainer,
	CardHeader,
} from '@root/presentation/web-ui/uiKit/card/card';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@root/presentation/web-ui/uiKit/iconButton/iconButton';
import {
	ValueAction,
	ValueActionLeading,
} from '@root/presentation/web-ui/uiKit/valueAction/valueAction';

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

	let user = useUserOneByIdQuery();
	let { mutate: updateUser } = useUserUpdateMutation(user.id);

	let appConfig = useAppConfigQuery();
	let { mutate: updateAppConfig } = useAppConfigUpdateMutation();

	let venueListQuery = useVenueListUnarchivedQuery();

	return (
		<>
			<CardContainer>
				<Card>
					<CardHeader>{intl.translate('userSectionTitle')}</CardHeader>

					<ValueAction>
						<ValueActionLeading label={intl.translate('userName')}>
							{user.name}
						</ValueActionLeading>

						<IconButton
							iconName={EIconName.Edit}
							onClick={() => {
								let actionSheetApi = dialog.render(UserNameEditActionSheet, {
									userName: user.name,

									close: (payload: { userName: string }) => {
										updateUser({
											name: payload.userName,
										});

										actionSheetApi.close();
									},
								});
							}}
						/>
					</ValueAction>

					<ValueAction>
						<ValueActionLeading label={intl.translate('userAccount')}>
							—
						</ValueActionLeading>

						<Button
							className="mr-1"
							size="s"
							onClick={() => {
								navigation.loginPage();
							}}
						>
							{intl.translate('loginButton')}
						</Button>
					</ValueAction>
				</Card>

				<Card>
					<CardHeader>{intl.translate('appSectionTitle')}</CardHeader>

					<ValueAction>
						<ValueActionLeading label={intl.translate('appLanguage')}>
							{getLanguageNameByLocale(appConfig.locale)}
						</ValueActionLeading>

						<IconButton
							iconName={EIconName.CaretDown}
							onClick={() => dialog.render(LocaleActionSheet)}
						/>
					</ValueAction>
				</Card>

				<Card>
					<CardHeader>{intl.translate('currencySectionTitle')}</CardHeader>

					<ValueAction>
						<ValueActionLeading label={intl.translate('currencyMain')}>
							{appConfig.currency}
						</ValueActionLeading>

						<IconButton
							iconName={EIconName.CaretDown}
							onClick={() => dialog.render(CurrencyActionSheet)}
						/>
					</ValueAction>

					<ValueAction>
						<ValueActionLeading
							className="gap-2"
							label={intl.translate('currencyAvailable')}
						>
							<Badges>
								{appConfig.availabelCurrencies.map((currency) => (
									<Badge key={currency}>{currency}</Badge>
								))}
							</Badges>
						</ValueActionLeading>

						<IconButton
							iconName={EIconName.Settings}
							onClick={() => {
								// eslint-disable-next-line no-alert
								window.alert('Not Implemented');
							}}
						/>
					</ValueAction>
				</Card>

				<Card>
					<CardHeader>{intl.translate('budgetSectionTitle')}</CardHeader>

					<ValueAction>
						<ValueActionLeading label={appConfig.currency}>
							{intlService.formatCurrency(appConfig.budget || 0)}
						</ValueActionLeading>

						<IconButton
							iconName={EIconName.Edit}
							onClick={() => {
								let actionSheetApi = dialog.render(BudgetEditActionsSheet, {
									budget: appConfig.budget ?? 0,
									currency: appConfig.currency,

									close: (payload: { budget: number }) => {
										updateAppConfig({
											budget: payload.budget,
										});

										actionSheetApi.close();
									},
								});
							}}
						/>
					</ValueAction>
				</Card>

				<Card>
					<CardHeader>{intl.translate('categoriesSectionTitle')}</CardHeader>

					<ValueAction>
						<ValueActionLeading>
							<Badges>
								{categoryTemplates.map((category) => (
									<Badge key={category.id}>{category.name}</Badge>
								))}
							</Badges>
						</ValueActionLeading>

						<IconButton
							iconName={EIconName.Settings}
							onClick={() => {
								navigation.categoryListPage();
							}}
						/>
					</ValueAction>
				</Card>

				<Card>
					<CardHeader>{intl.translate('venuesSectionTitle')}</CardHeader>

					<ValueAction>
						<ValueActionLeading>
							<Badges>
								{venueListQuery.map((venue) => (
									<Badge key={venue.id}>{venue.name}</Badge>
								))}
							</Badges>
						</ValueActionLeading>

						<IconButton
							iconName={EIconName.Settings}
							onClick={() => {
								navigation.venueListPage();
							}}
						/>
					</ValueAction>
				</Card>
			</CardContainer>
		</>
	);
}
