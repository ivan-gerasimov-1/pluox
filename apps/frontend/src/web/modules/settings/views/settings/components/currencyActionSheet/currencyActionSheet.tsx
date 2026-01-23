import { currencyActionSheetI18n } from './currencyActionSheet.i18n';
import {
	ECurrency,
	TCurrency,
} from '@pluox/core/src/modules/currency/domain/types';
import { useState } from 'react';

import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@/web/modules/settings/queries/appConfig';
import { Button } from '@/web/uiKit/button/button';
import type { TDialogComponentProps } from '@/web/uiKit/dialog/core/types';
import { ActionSheetSelect } from '@/web/uiKit/dialog/react/actionSheetSelect/actionSheetSelect';

export function CurrencyActionSheet({
	close,
}: TDialogComponentProps<{}, void>) {
	let intl = useIntl(currencyActionSheetI18n);

	let appConfig = useAppConfigQuery();
	let { mutate: updateAppConfig } = useAppConfigUpdateMutation();

	let [selectedCurrency, setSelectedCurrency] = useState<TCurrency>(
		appConfig.currency,
	);

	const currencies = Object.values(ECurrency).map((currency) => ({
		id: currency,
		name: currency,
	}));

	function handleSave() {
		updateAppConfig(
			{
				currency: selectedCurrency,
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
				value={selectedCurrency}
				items={currencies}
				onSelect={setSelectedCurrency}
			/>

			<Button onClick={handleSave} wide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
