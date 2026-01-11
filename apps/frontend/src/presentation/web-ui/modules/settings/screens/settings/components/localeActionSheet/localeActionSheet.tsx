import { localeActionSheetI18n } from './localeActionSheet.i18n';
import { ELocaleCode } from '@/core/modules/intl/domain/enums';
import type { TLocaleCode } from '@/core/modules/intl/domain/types';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@/presentation/web-ui/modules/settings/queries/appConfig';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import type { TDialogComponentProps } from '@/presentation/web-ui/uiKit/dialog/core/types';
import { ActionSheetSelect } from '@/presentation/web-ui/uiKit/dialog/react/actionSheetSelect/actionSheetSelect';
import { useState } from 'react';

export function LocaleActionSheet({ close }: TDialogComponentProps<{}, void>) {
	let intl = useIntl(localeActionSheetI18n);

	let appConfig = useAppConfigQuery();
	let { mutate: updateAppConfig } = useAppConfigUpdateMutation();

	let [selectedLocale, setSelectedLocale] = useState<TLocaleCode>(
		appConfig.locale,
	);

	function handleSave() {
		updateAppConfig(
			{
				locale: selectedLocale,
			},
			{
				onSuccess: () => {
					close();
				},
			},
		);
	}

	return (
		<>
			<ActionSheetSelect
				value={selectedLocale}
				items={[
					{
						id: ELocaleCode.RU_RU,
						name: 'Русский',
					},
					{
						id: ELocaleCode.EN_US,
						name: 'English',
					},
				]}
				onSelect={setSelectedLocale}
			/>

			<Button onClick={handleSave} wide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
