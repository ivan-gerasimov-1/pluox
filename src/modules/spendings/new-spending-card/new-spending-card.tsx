import { useIntl } from '@modules/intl';
import { AmountInput } from '@modules/spendings/new-spending-card/components/amount-input/amount-input';
import { newSpendingCardI18n } from '@modules/spendings/new-spending-card/new-spending-card.i18n';
import { $spendingApi } from '@modules/spendings/spendings.store';
import { useState } from 'react';
import styles from './new-spending-card.module.css';

export function NewSpendingCard() {
	let intl = useIntl(newSpendingCardI18n);
	let [formState, setFormState] = useState({
		amount: 0,
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formState.amount || formState.amount === 0) {
			return;
		}

		$spendingApi.create({
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
		<form name="newSpending" onSubmit={handleSubmit}>
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
