import { useMemo, useState } from 'react';

import { ECurrency, TCurrency } from '@root/core/modules/currency/domain/types';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import {
	useAppConfigQuery,
	useAppConfigUpdateMutation,
} from '@root/presentation/web-ui/modules/settings/queries/appConfig';

import { currencyActionSheetI18n } from './currencyActionSheet.i18n';

import styles from './currencyActionSheet.module.css';

export function CurrencyActionSheet({
	close,
}: TDialogComponentProps<{}, void>) {
	let intl = useIntl(currencyActionSheetI18n);

	let appConfig = useAppConfigQuery();
	let { mutate: updateAppConfig } = useAppConfigUpdateMutation();

	let currencies = useMemo(
		() => Object.values(ECurrency).map((currency) => currency),
		[],
	);

	let [selectedCurrency, setSelectedCurrency] = useState<TCurrency>(
		appConfig.currency,
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
			<ul
				style={{
					listStyle: 'none',
					margin: 0,
					padding: 0,
					paddingBlockEnd: '20px',
				}}
			>
				{currencies.map((currencyItem) => (
					<li
						key={currencyItem}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '10px',
						}}
						onClick={() => setSelectedCurrency(currencyItem)}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<div
								style={{
									width: '25px',
									height: '25px',
									backgroundColor: 'var(--black-100)',
									borderRadius: '10px',
									marginInlineEnd: '15px',
								}}
							></div>
							<span>{currencyItem}</span>
						</div>
						{selectedCurrency === currencyItem && (
							<span
								style={{
									fontWeight: 600,
								}}
							>
								✓
							</span>
						)}
					</li>
				))}
			</ul>

			<Button className={styles.actionSheetButton} onClick={handleSave} isWide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
