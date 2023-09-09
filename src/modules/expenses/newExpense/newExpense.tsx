import { useExpensesStore } from '@modules/expenses';
import { AmountInput } from '@modules/expenses/newExpense/components/amountInput/amountInput';
import { CurrencyInput } from '@modules/expenses/newExpense/components/currencyInput/currencyInput';
import { NumericKeyboard } from '@modules/expenses/newExpense/components/numericKeyboard/numericKeyboard';
import { newExpenseI18n } from '@modules/expenses/newExpense/newExpense.i18n';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import { useIntl } from '@modules/intl';
import { useState } from 'react';
import styles from './newExpense.module.css';
import { ECurrency } from '@core/infrastructure/currency/types';
import { TISODateString } from '@domain/types';
import { DateInput } from '@modules/expenses/newExpense/components/dateInput/DateInput';

function createFromattedDate(): string {
	let datetime = new Date().toISOString();

	let [date, time] = datetime.split('T');
	let [hours, minutes] = time.split(':');

	return `${date}T${hours}:${minutes}`;
}

function createDateViewValue(): TISODateString {
	const date = new Date();

	function format(value: number): string {
		if (value < 10) {
			return `0${value}`;
		}

		return `${value}`;
	}

	return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
		date.getDay(),
	)}T${format(date.getHours())}:${format(date.getMinutes())}`;
}

function convertDateToModelValue(date: string): TISODateString {
	return new Date(date).toISOString();
}

export function NewExpense() {
	let [testAmount, setTestAmount] = useState<string>('0');
	let intl = useIntl(newExpenseI18n);
	let addExpense = useExpensesStore((state) => state.addExpense);
	let [formState, setFormState] = useState({
		amount: 0,
		currency: ECurrency.GEL,
		comment: '',
		date: createDateViewValue(),
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formState.amount || formState.amount === 0) {
			return;
		}

		addExpense({
			amount: formState.amount,
			currency: formState.currency,
			comment: formState.comment,
			date: convertDateToModelValue(formState.date),
		});

		resetFormState();
	}

	function resetFormState() {
		setFormState((prevState) => ({
			amount: 0,
			currency: prevState.currency,
			comment: '',
			date: createFromattedDate(),
		}));
	}

	function handleAmountChange(amount: number) {
		setFormState((prevState) => ({
			...prevState,
			amount,
		}));
	}

	function _handleAmountChange(amount: number) {
		setFormState((prevState) => ({
			...prevState,
			amount,
		}));
	}

	function handleCurrencyChange(currency: ECurrency) {
		setFormState((prevState) => ({
			...prevState,
			currency,
		}));
	}

	function handleCommentChange(
		event: React.ChangeEvent<HTMLTextAreaElement>,
	): void {
		const comment = event.target.value;

		setFormState((prevState) => ({
			...prevState,
			comment: comment,
		}));
	}

	function handleDateChange(date: string) {
		setFormState((prevState) => ({
			...prevState,
			date,
		}));
	}

	return (
		<form name="newExpense" onSubmit={handleSubmit}>
			<div className={styles.formGroup}>
				<AmountInput
					value={formState.amount}
					onChange={handleAmountChange}
					required
					autoFocus
				/>

				<button type="submit" className={styles.submitButton}>
					{intl.translate('submitButton')}
				</button>
			</div>

			<br />

			<div>
				<CurrencyInput
					value={formState.currency}
					onChange={handleCurrencyChange}
				/>
			</div>

			<br />

			<div>
				<textarea
					name="newExpense_comment"
					id="newExpense_comment"
					className={styles.commentField}
					value={formState.comment}
					onChange={handleCommentChange}
					placeholder={intl.translate('commentPlaceholder')}
				></textarea>
			</div>

			<br />

			<div>
				<DateInput initialValue={formState.date} onChange={handleDateChange} />
			</div>

			{false && (
				<>
					<span>{testAmount}</span>

					<NumericKeyboard
						value={testAmount}
						onClick={(value: string | number) => {
							console.log(value);
							if (value === ',') {
								setTestAmount((prevTestAmount) => {
									return `${prevTestAmount}${value}`;
								});
								return;
							}

							setTestAmount((prevTestAmount) => {
								return toModelValue(`${prevTestAmount}${value}`).toLocaleString(
									IntlService.getInstance().locale,
								);
							});
						}}
					/>
				</>
			)}
		</form>
	);
}

function toModelValue(value: string): number {
	return IntlService.getInstance().parseNumber(value);
}
