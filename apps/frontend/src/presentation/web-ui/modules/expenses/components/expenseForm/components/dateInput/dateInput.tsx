import { useState } from 'react';

import styles from './dateInput.module.css';

type TDateInputProps = {
	initialValue?: string;

	onChange(value: string): void;
};

export function DateInput(props: TDateInputProps) {
	let [value, setValue] = useState<string>(props.initialValue || '');

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const date = event.target.value;

		setValue(date);

		props.onChange(date);
	}

	return (
		<input
			type="datetime-local"
			name="newExpense_datetime"
			id="newExpense_datetime"
			className={styles.datetimeInput}
			value={value}
			onChange={handleChange}
		/>
	);
}
