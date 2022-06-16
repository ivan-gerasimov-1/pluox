import { validateNumber } from '@modules/spendings/new-spending-card/components/amount-input/helpers';
import { useEffect, useState } from 'react';
import styles from './amount-input.module.css';

type TAmountInputProps = {
	value: number;
	onChange(amount: number, rawAmount: string): void;
	autoFocus?: boolean;
	required?: boolean;
};

function toViewValue(value: number): string {
	if (!value) {
		return '';
	}

	return value.toString();
}

function toModelValue(value: string): number {
	return Number.parseFloat(value);
}

export function AmountInput(props: TAmountInputProps) {
	let [amount, setAmount] = useState<string>(() => {
		return toViewValue(props.value);
	});

	useEffect(() => {
		setAmount(toViewValue(props.value));
	}, [props.value]);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		let rawValue = event.target.value;
		let isValidNumber = validateNumber(rawValue);

		if (!isValidNumber) {
			return;
		}

		let value = toModelValue(rawValue);

		setAmount(rawValue);

		return props.onChange(value, rawValue);
	}

	return (
		<input
			id="amount"
			name="amount"
			type="text"
			inputMode="decimal"
			className={styles.textInput}
			value={amount}
			onChange={handleChange}
			required={props.required}
			autoFocus={props.autoFocus}
		/>
	);
}
