import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import { NumericKeyboard } from '@modules/expenses/expenseView/components/numericKeyboard/numericKeyboard';
import { useState } from 'react';

export type TAmountInputProps = {
	amount: string;

	onChange(value: string): void;
};

export function _AmountInput(props: TAmountInputProps) {
	let [amount, setAmount] = useState<string>(props.amount);

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
			).toLocaleString(IntlService.getInstance().locale);

			props.onChange(nextAmount);

			return nextAmount;
		});
	}

	return <NumericKeyboard value={amount} onClick={handleChange} />;
}

function toModelValue(value: string): number {
	return IntlService.getInstance().parseNumber(value);
}
