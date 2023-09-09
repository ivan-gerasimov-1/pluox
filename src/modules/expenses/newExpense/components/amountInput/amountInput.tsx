import {
	validateKey,
	validateNumber,
} from '@modules/expenses/newExpense/components/amountInput/helpers';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import React, { useEffect, useState } from 'react';
import styles from './amountInput.module.css';

type TAmountInputProps = {
	value: number;
	onChange(amount: number, rawAmount: string): void;
	autoFocus?: boolean;
	required?: boolean;
};

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
			onKeyDown={validateKey}
			required={props.required}
			autoFocus={props.autoFocus}
		/>
	);
}

function toViewValue(value: number): string {
	if (!value) {
		return '';
	}

	return value.toLocaleString(IntlService.getInstance().locale);
}

function toModelValue(value: string): number {
	return IntlService.getInstance().parseNumber(value);
}
