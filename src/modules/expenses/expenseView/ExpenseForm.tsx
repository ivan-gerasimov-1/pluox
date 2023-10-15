import { ECurrency } from '@core/infrastructure/currency/types';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import type { TISODateString } from '@domain/types';
import { AmountInput } from '@modules/expenses/expenseView/components/amountInput/amountInput';
import { CategoryInput } from '@modules/expenses/expenseView/components/categoryInput/CategoryInput';
import { CurrencyInput } from '@modules/expenses/expenseView/components/currencyInput/currencyInput';
import { DateInput } from '@modules/expenses/expenseView/components/dateInput/DateInput';
import { NumericKeyboard } from '@modules/expenses/expenseView/components/numericKeyboard/numericKeyboard';
import { newExpenseI18n } from '@modules/expenses/expenseView/expenseView.i18n';
import { useIntl } from '@modules/intl';
import { useState } from 'react';
import styles from './expenseView.module.css';

export type TExpenseFormProps = {
	onSubmit(payload: {
		amount: number;
		currency: ECurrency;
		comment: string;
		category: string | null;
		date: string;
	}): void;

	amount: number;
	currency: ECurrency;
	comment: string;
	category: string;
	date: string;
};

export function ExpenseForm(props: TExpenseFormProps) {
	let [testAmount, setTestAmount] = useState<string>('0');
	let intl = useIntl(newExpenseI18n);

	let [formState, setFormState] = useState({
		amount: props.amount,
		currency: props.currency,
		comment: props.comment,
		category: props.category,
		date: props.date,
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formState.amount || formState.amount === 0) {
			return;
		}

		props.onSubmit({
			amount: formState.amount,
			currency: formState.currency,
			comment: formState.comment,
			category: formState.category || null,
			date: convertDateToModelValue(formState.date),
		});

		resetFormState();
	}

	function resetFormState() {
		setFormState(() => ({
			amount: props.amount,
			currency: props.currency,
			comment: props.comment,
			category: props.category,
			date: props.date,
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

	function handleCategoryChange(id: string) {
		setFormState((prevState) => ({
			...prevState,
			category: id,
		}));
	}

	return (
		<form name="expenseForm" onSubmit={handleSubmit}>
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

			<div className={styles.formGroup}>
				<div>
					<CategoryInput
						value={formState.category}
						onChange={handleCategoryChange}
					/>
				</div>

				<div className={styles.spacer} />

				<div className={styles['formGroupItem--2-3']}>
					<DateInput
						initialValue={formState.date}
						onChange={handleDateChange}
					/>
				</div>
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

function convertDateToModelValue(date: string): TISODateString {
	return new Date(date).toISOString();
}

function toModelValue(value: string): number {
	return IntlService.getInstance().parseNumber(value);
}
