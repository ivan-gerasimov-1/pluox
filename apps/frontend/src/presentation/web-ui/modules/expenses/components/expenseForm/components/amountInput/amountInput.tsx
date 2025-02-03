import type React from 'react';
import { useEffect, useState } from 'react';

import {
	validateKey,
	validateNumber,
} from '@root/presentation/web-ui/modules/expenses/components/expenseForm/components/amountInput/helpers';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';

import styles from './amountInput.module.css';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TAmountInputProps = {
	id?: string;
	name: string;

	className?: string;

	ref?: React.RefCallback<HTMLInputElement>;

	value: number;
	autoFocus?: boolean;
	required?: boolean;

	onChange(value: number): void;
	onBlur(event: React.FocusEvent<HTMLInputElement, Element>): void;
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

		setAmount(rawValue);

		let modelValue = toModelValue(rawValue);

		return props.onChange(modelValue);
	}

	return (
		<input
			id={props.id || props.name}
			name={props.name}
			type="text"
			inputMode="decimal"
			className={cls(styles.textInput, props.className)}
			ref={props.ref}
			value={amount}
			onChange={handleChange}
			onBlur={props.onBlur}
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
