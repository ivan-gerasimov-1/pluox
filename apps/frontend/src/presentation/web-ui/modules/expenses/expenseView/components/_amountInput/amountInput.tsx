import { useState } from 'react';

import { NumericKeyboard } from '@root/presentation/web-ui/modules/expenses/expenseView/components/numericKeyboard/numericKeyboard';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { useService } from '@root/core/infrastructure/serviceContainer/react/useService';
import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';

export type TAmountInputProps = {
	amount: string;

	onChange(value: string): void;
};

export function _AmountInput(props: TAmountInputProps) {
	let [amount, setAmount] = useState<string>(props.amount);

	let intlService = useService(EServiceToken.INTL_SERVICE);

	function handleChange(value: string | number) {
		if (value === ',') {
			setAmount((prevTestAmount) => {
				return `${prevTestAmount}${value}`;
			});

			return;
		}

		setAmount((prevTestAmount) => {
			const nextAmount = toModelValue(
				`${prevTestAmount}${value}`,
			).toLocaleString(intlService.locale);

			props.onChange(nextAmount);

			return nextAmount;
		});
	}

	return <NumericKeyboard value={amount} onClick={handleChange} />;
}

function toModelValue(value: string): number {
	let intlService = resolveService(EServiceToken.INTL_SERVICE);

	return intlService.parseNumber(value);
}
