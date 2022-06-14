import { AmountInput } from '@modules/spendings/new-spending-card/components/amount-input/amount-input';
import { $spendingApi } from '@modules/spendings/spendings.store';
import { useState } from 'react';

export function NewSpendingCard() {
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
			<AmountInput
				value={formState.amount}
				onChange={handleAmountChange}
				required
				autoFocus
			/>
		</form>
	);
}
