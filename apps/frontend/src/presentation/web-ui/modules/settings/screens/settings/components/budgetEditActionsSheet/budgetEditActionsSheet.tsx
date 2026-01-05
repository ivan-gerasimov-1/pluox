import { useState } from 'react';

import type { TCurrency } from '@root/core/modules/currency/domain/types';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { budgetEditActionsSheetI18n } from '@root/presentation/web-ui/modules/settings/screens/settings/components/budgetEditActionsSheet/budgetEditActionsSheet.i18n';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';
import { Input } from '@root/presentation/web-ui/uiKit/input/input';

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
			<div className="border-neutral-200/50 rounded-2xl bg-white flex items-center border">
				<span className="p-2 pl-5 pr-1 text-xs">{props.currency}</span>

				<Input
					type="number"
					className="border-0"
					value={budget ?? 0}
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
