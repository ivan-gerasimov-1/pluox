import { ECurrency } from '@domain/expense/types';
import { useExpensesStore } from '@modules/expenses';
import { AmountInput } from '@modules/expenses/new-expense/components/amount-input/amount-input';
import { CurrencyInput } from '@modules/expenses/new-expense/components/currency-input/currency-input';
import { NumericKeyboard } from '@modules/expenses/new-expense/components/numeric-keyboard/numeric-keyboard';
import { newExpenseI18n } from '@modules/expenses/new-expense/new-expense.i18n';
import { IntlService, useIntl } from '@modules/intl';
import { useState } from 'react';
import styles from './new-expense.module.css';

export function NewExpense() {
	let [testAmount, setTestAmount] = useState<string>('0');
	let intl = useIntl(newExpenseI18n);
	let addExpense = useExpensesStore((state) => state.addExpense);
	let [formState, setFormState] = useState({
		amount: 0,
		currency: ECurrency.RUB,
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formState.amount || formState.amount === 0) {
			return;
		}

		addExpense({
			amount: formState.amount,
			currency: formState.currency,
		});

		setFormState((state) => ({
			amount: 0,
			currency: state.currency,
		}));
	}

	function handleAmountChange(amount: number) {
		setFormState((state) => ({
			amount,
			currency: state.currency,
		}));
	}

	function _handleAmountChange(amount: number) {
		setFormState((state) => ({
			amount,
			currency: state.currency,
		}));
	}

	function handleCurrencyChange(currency: ECurrency) {
		setFormState((state) => ({
			amount: state.amount,
			currency,
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
									IntlService.locale
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
	return IntlService.numberParser.parse(value);
}
