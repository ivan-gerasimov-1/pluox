import type React from 'react';
import { useEffect, useState } from 'react';

import {
	validateKey,
	validateNumber,
} from '@root/presentation/web-ui/modules/expenses/expenseView/components/amountInput/helpers';
import { EServiceToken } from '@modules/serviceContainer/types';
import { resolveService } from '@modules/serviceContainer/resolveService';

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

	let intlService = resolveService(EServiceToken.INTL_SERVICE);

	return value.toLocaleString(intlService.locale);
}

function toModelValue(value: string): number {
	let intlService = resolveService(EServiceToken.INTL_SERVICE);

	return intlService.parseNumber(value);
}
