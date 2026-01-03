import { useEffect, useState } from 'react';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';

import {
	validateKey,
	validateNumber,
} from '@root/presentation/web-ui/modules/expenses/components/expenseForm/components/amountInput/helpers';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { Input } from '@root/presentation/web-ui/uiKit/input/input';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TAmountInputProps = {
	id?: string;
	name: string;

	className?: string;

	ref?: React.Ref<HTMLInputElement>;

	value: number;
	autoFocus?: boolean;
	required?: boolean;

	onChange(value: number): void;
	onBlur(event: React.FocusEvent<HTMLInputElement, Element>): void;
};

export function AmountInput({
	className,
	ref,
	id,
	name,
	value,
	autoFocus,
	required,
	onBlur,
	onChange,
}: TAmountInputProps) {
	let [amount, setAmount] = useState<string>(() => {
		return toViewValue(value);
	});

	useEffect(() => {
		setAmount(toViewValue(value));
	}, [value]);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		let rawValue = event.target.value;
		let isValidNumber = validateNumber(rawValue);

		if (!isValidNumber) {
			return;
		}

		setAmount(rawValue);

		let modelValue = toModelValue(rawValue);

		onChange(modelValue);
	}

	return (
		<Input
			id={id || name}
			name={name}
			type="text"
			inputMode="decimal"
			className={cls(
				'border-neutral-300/75 rounded-tl-none rounded-bl-none',
				className,
			)}
			ref={ref}
			value={amount}
			onChange={handleChange}
			onBlur={onBlur}
			onKeyDown={validateKey}
			required={required}
			autoFocus={autoFocus}
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
