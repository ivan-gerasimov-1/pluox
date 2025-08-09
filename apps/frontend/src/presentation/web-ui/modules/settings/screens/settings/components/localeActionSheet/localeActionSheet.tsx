import { useState } from 'react';

import { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import type { TLocaleCode } from '@root/core/modules/intl/domain/types';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { ActionSheetSelect } from '@root/presentation/web-ui/uiKit/dialog/react/actionSheetSelect/actionSheetSelect';

import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@root/presentation/web-ui/modules/settings/queries/appConfig';

import { localeActionSheetI18n } from './localeActionSheet.i18n';

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

			<Button onClick={handleSave} isWide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
