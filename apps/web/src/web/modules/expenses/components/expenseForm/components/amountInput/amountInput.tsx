import { useEffect, useState } from 'react';

import { resolveService } from '@core/infrastructure/serviceContainer/resolveService';

import { cn } from '@/web/utils/classnames';

import {
	validateKey,
	validateNumber,
} from '@/web/modules/expenses/components/expenseForm/components/amountInput/helpers';
import { EServiceToken } from '@/web/modules/serviceContainer/enums';

import { Input } from '@kit/input/input';

type TAmountInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'onChange' | 'value'
> & {
	value: number;
	onChange: (value: number) => void;
};

export function AmountInput({
	value,
	onChange,
	className,
	inputMode = 'decimal',
	...props
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
			{...props}
			type="text"
			inputMode={inputMode}
			className={cn('rounded-tl-none rounded-bl-none', className)}
			value={amount}
			onChange={handleChange}
			onKeyDown={validateKey}
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
