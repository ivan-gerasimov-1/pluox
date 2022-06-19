import { useExpensesStore } from '@modules/expenses';
import { AmountInput } from '@modules/expenses/new-expense/components/amount-input/amount-input';
import { newExpenseI18n } from '@modules/expenses/new-expense/new-expense.i18n';
import { useIntl } from '@modules/intl';
import { useState } from 'react';
import styles from './new-expense.module.css';

export function NewExpense() {
	let intl = useIntl(newExpenseI18n);
	let addExpense = useExpensesStore((state) => state.addExpense);
	let [formState, setFormState] = useState({
		amount: 0,
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formState.amount || formState.amount === 0) {
			return;
		}

		addExpense({
			amount: formState.amount,
		});

		setFormState({
			amount: 0,
		});
	}

	function handleAmountChange(amount: number) {
		setFormState({
			amount,
		});
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
		</form>
	);
}
