import { useState } from 'react';

import type { TCurrency } from '@core/modules/currency/domain/types';

import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { budgetEditActionsSheetI18n } from '@/web/modules/settings/views/settings/components/budgetEditActionsSheet/budgetEditActionsSheet.i18n';

import { Button } from '@kit/button/button';
import type { TDialogComponentProps } from '@kit/dialog/core/types';
import { Input } from '@kit/input/input';

type BudgetEditActionsSheetProps = TDialogComponentProps<
	{
		budget: number;
		currency: TCurrency;
	},
	{
		budget: number;
	}
>;

export function BudgetEditActionsSheet(props: BudgetEditActionsSheetProps) {
	let intl = useIntl(budgetEditActionsSheetI18n);
	let [budget, setBudget] = useState(props.budget);

	return (
		<>
			<div className="flex items-center rounded-2xl border border-gray-200/50 bg-white">
				<span className="p-2 pr-1 pl-5 text-xs">{props.currency}</span>

				<Input
					type="number"
					className="border-0"
					value={budget}
					onChange={(event) => {
						let budgetValue = Number.parseInt(event.target.value, 10);

						setBudget(budgetValue);
					}}
				/>
			</div>

			<Button
				className="mt-5"
				onClick={() => {
					props.close({
						budget,
					});
				}}
				wide
			>
				{intl.translate('save')}
			</Button>
		</>
	);
}
