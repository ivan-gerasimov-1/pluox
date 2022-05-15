import { useIntl } from '@modules/intl';
import { AmountInput } from '@modules/spendings/new-spending/components/amount-input/amount-input';
import { newSpendingI18n } from '@modules/spendings/new-spending/new-spending.i18n';
import { generateId } from '@utils/id';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { $spendingApi } from '../spendings.store';
import styles from './new-spending.module.css';

export function NewSpending() {
	let navigate = useNavigate();
	let intl = useIntl(newSpendingI18n);
	let [formState, setFormState] = useState({
		amount: 0,
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formState.amount || formState.amount === 0) {
			return;
		}

		$spendingApi.create({
			id: generateId(),
			amount: formState.amount,
			dateCreated: new Date().toISOString(),
		});

		navigate('/');
	}

	return (
		<div style={{ margin: '1rem' }}>
			<form name="newSpending" onSubmit={handleSubmit}>
				<AmountInput
					onChange={(amount) => setFormState({ amount })}
					required
					autoFocus
				/>

				<button className={styles.submitButton} type="submit">
					{intl.translate('submitButton')}
				</button>
			</form>
		</div>
	);
}
