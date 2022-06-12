import { validateNumber } from '@modules/spendings/new-spending/components/amount-input/helpers';
import { useState } from 'react';
import styles from './amount-input.module.css';

type TAmountInputProps = {
	value?: number;
	onChange(amount: number, rawAmount: string): void;
	autoFocus?: boolean;
	required?: boolean;
};

/** @deprecated */
export function AmountInput(props: TAmountInputProps) {
	let [amount, setAmount] = useState<string>(() => {
		if (!props.value) {
			return '';
		}

		return props.value.toString();
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		let rawValue = event.target.value;
		let isValidNumber = validateNumber(rawValue);

		if (!isValidNumber) {
			return;
		}

		let value = Number.parseFloat(rawValue);

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
