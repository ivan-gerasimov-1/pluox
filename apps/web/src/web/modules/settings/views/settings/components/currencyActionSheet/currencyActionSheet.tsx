import { currencyActionSheetI18n } from './currencyActionSheet.i18n';
import { useMemo, useState } from 'react';

import { ECurrency, TCurrency } from '@core/modules/currency/domain/types';

import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@/web/modules/settings/queries/appConfig';

import { Button } from '@kit/button/button';
import type { TDialogComponentProps } from '@kit/dialog/core/types';
import { ActionSheetSelect } from '@kit/dialog/react/actionSheetSelect/actionSheetSelect';

export function CurrencyActionSheet({
	close,
}: TDialogComponentProps<{}, void>) {
	let intl = useIntl(currencyActionSheetI18n);

	let appConfig = useAppConfigQuery();
	let { mutate: updateAppConfig } = useAppConfigUpdateMutation();

	let [selectedCurrency, setSelectedCurrency] = useState<TCurrency>(
		appConfig.currency,
	);

	const currencies = useMemo(
		() =>
			Object.values(ECurrency).map((currency) => ({
				id: currency,
				name: currency,
			})),
		[],
	);

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
