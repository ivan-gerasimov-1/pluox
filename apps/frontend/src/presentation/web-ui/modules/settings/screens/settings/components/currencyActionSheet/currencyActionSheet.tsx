import { currencyActionSheetI18n } from './currencyActionSheet.i18n';
import { useState } from 'react';

import { ECurrency, TCurrency } from '@root/core/modules/currency/domain/types';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@root/presentation/web-ui/modules/settings/queries/appConfig';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';
import { ActionSheetSelect } from '@root/presentation/web-ui/uiKit/dialog/react/actionSheetSelect/actionSheetSelect';

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

			<Button onClick={handleSave} isWide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
