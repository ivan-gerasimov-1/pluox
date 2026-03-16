import { localeActionSheetI18n } from './localeActionSheet.i18n';
import { useMemo, useState } from 'react';

import { ELocaleCode } from '@core/modules/intl/domain/enums';
import type { TLocaleCode } from '@core/modules/intl/domain/types';

import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@/web/modules/settings/queries/appConfig';

import { Button } from '@kit/button/button';
import type { TDialogComponentProps } from '@kit/dialog/core/types';
import { ActionSheetSelect } from '@kit/dialog/react/actionSheetSelect/actionSheetSelect';

export function LocaleActionSheet({ close }: TDialogComponentProps<{}, void>) {
	let intl = useIntl(localeActionSheetI18n);

	let appConfig = useAppConfigQuery();
	let { mutate: updateAppConfig } = useAppConfigUpdateMutation();

	let [selectedLocale, setSelectedLocale] = useState<TLocaleCode>(
		appConfig.locale,
	);

	let localeList = useMemo(
		() => [
			{
				id: ELocaleCode.RU_RU,
				name: 'Русский',
			},
			{
				id: ELocaleCode.EN_US,
				name: 'English',
			},
		],
		[],
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
				items={localeList}
				onSelect={setSelectedLocale}
			/>

			<Button onClick={handleSave} wide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
