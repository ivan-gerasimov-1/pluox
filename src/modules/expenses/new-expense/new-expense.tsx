import { useExpensesStore } from '@modules/expenses';
import { AmountInput } from '@modules/expenses/new-expense/components/amount-input/amount-input';
import { CurrencyInput } from '@modules/expenses/new-expense/components/currency-input/currency-input';
import { NumericKeyboard } from '@modules/expenses/new-expense/components/numeric-keyboard/numeric-keyboard';
import { newExpenseI18n } from '@modules/expenses/new-expense/new-expense.i18n';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import { useIntl } from '@modules/intl';
import { useState } from 'react';
import styles from './new-expense.module.css';
import { ECurrency } from '@core/infrastructure/currency/types';

export function NewExpense() {
	let [testAmount, setTestAmount] = useState<string>('0');
	let intl = useIntl(newExpenseI18n);
	let addExpense = useExpensesStore((state) => state.addExpense);
	let [formState, setFormState] = useState({
		amount: 0,
		currency: ECurrency.GEL,
		comment: '',
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
		});

		resetFormState();
	}

	function resetFormState() {
		setFormState((prevState) => ({
			amount: 0,
			currency: prevState.currency,
			comment: '',
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

			<CurrencyInput
				value={formState.currency}
				onChange={handleCurrencyChange}
			/>

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

function toModelValue(value: string): number {
	return IntlService.getInstance().parseNumber(value);
}
