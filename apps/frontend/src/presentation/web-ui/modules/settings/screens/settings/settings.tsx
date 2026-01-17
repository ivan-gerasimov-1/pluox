import { categoryTemplates } from '@/core/modules/category/domain/categoryTemplate/templates';
import { getLanguageNameByLocale } from '@/core/modules/intl/application/helpers';

import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@/presentation/web-ui/modules/settings/queries/appConfig';
import {
	useUserOneByIdQuery,
	useUserUpdateMutation,
} from '@/presentation/web-ui/modules/settings/queries/user';
import { BudgetEditActionsSheet } from '@/presentation/web-ui/modules/settings/screens/settings/components/budgetEditActionsSheet/budgetEditActionsSheet';
import { CurrencyActionSheet } from '@/presentation/web-ui/modules/settings/screens/settings/components/currencyActionSheet/currencyActionSheet';
import { LocaleActionSheet } from '@/presentation/web-ui/modules/settings/screens/settings/components/localeActionSheet/localeActionSheet';
import { UserNameEditActionSheet } from '@/presentation/web-ui/modules/settings/screens/settings/components/userNameEditActionSheet/userNameEditActionSheet';
import { settingsI18n } from '@/presentation/web-ui/modules/settings/screens/settings/settings.i18n';
import { useVenueListUnarchivedQuery } from '@/presentation/web-ui/modules/venues/queries/venues.query';
import { Badge, Badges } from '@/presentation/web-ui/uiKit/badge/badge';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import { useDialog } from '@/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { EIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@/presentation/web-ui/uiKit/iconButton/iconButton';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { Paper } from '@/presentation/web-ui/uiKit/paper/paper';
import { Title } from '@/presentation/web-ui/uiKit/title/title';
import {
	ValueAction,
	ValueActionLeading,
} from '@/presentation/web-ui/uiKit/valueAction/valueAction';

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
			<Paper asChild>
				<Stack>
					<Title>{intl.translate('userSectionTitle')}</Title>

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
				</Stack>
			</Paper>

			<Paper asChild>
				<Stack>
					<Title>{intl.translate('appSectionTitle')}</Title>

					<ValueAction>
						<ValueActionLeading label={intl.translate('appLanguage')}>
							{getLanguageNameByLocale(appConfig.locale)}
						</ValueActionLeading>

						<IconButton
							iconName={EIconName.CaretDown}
							onClick={() => dialog.render(LocaleActionSheet)}
						/>
					</ValueAction>
				</Stack>
			</Paper>

			<Paper asChild>
				<Stack>
					<Title>{intl.translate('currencySectionTitle')}</Title>

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
				</Stack>
			</Paper>

			<Paper asChild>
				<Stack>
					<Title>{intl.translate('budgetSectionTitle')}</Title>

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
				</Stack>
			</Paper>

			<Paper asChild>
				<Stack>
					<Title>{intl.translate('categoriesSectionTitle')}</Title>

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
				</Stack>
			</Paper>

			<Paper asChild>
				<Stack>
					<Title>{intl.translate('venuesSectionTitle')}</Title>

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
				</Stack>
			</Paper>
		</>
	);
}
