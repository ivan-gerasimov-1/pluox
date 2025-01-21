import { useReducer } from 'react';

import type { Id, TCategory, TDescription } from '@domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';
import { ECurrency } from '@root/core/modules/currency/domain/types';

import { AmountInput } from '@root/presentation/web-ui/modules/expenses/expenseForm/components/amountInput/amountInput';
import { CategoryPills } from '@root/presentation/web-ui/modules/expenses/expenseForm/components/categoryPills/categoryPills';
import { DescriptionInput } from '@root/presentation/web-ui/modules/expenses/expenseForm/components/commentInput/descriptionInput';
import { DateInput } from '@root/presentation/web-ui/modules/expenses/expenseForm/components/dateInput/dateInput';
import { VenuePills } from '@root/presentation/web-ui/modules/expenses/expenseForm/components/venuePills/venuePills';
import { expenseFormI18n } from '@root/presentation/web-ui/modules/expenses/expenseForm/expenseForm.i18n';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';

import styles from './expenseForm.module.css';

export type TExpenseFormProps = {
	onSubmit(payload: {
		amount: number;
		currency: ECurrency;
		description: TDescription;
		category: TCategory | null;
		venue: Id | null;
		date: TISODateString;
	}): void;

	amount: number;
	currency: ECurrency;
	description: TDescription;
	category: TCategory | null;
	venue: Id | null;
	date: TISODateString;
};

export function ExpenseForm(props: TExpenseFormProps) {
	let intl = useIntl(expenseFormI18n);
	let [formState, dispatch] = useReducer(expenseFormReducer, {
		amount: props.amount,
		currency: props.currency,
		description: props.description,
		category: props.category,
		venue: props.venue,
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
			description: formState.description,
			category: formState.category || null,
			venue: formState.venue || null,
			date: convertDateToModelValue(formState.date),
		});

		resetFormState();
	}

	function resetFormState() {
		dispatch({
			type: EExpenseFormReducerAction.RESET,

			amount: props.amount,
			currency: props.currency,
			description: props.description,
			category: props.category,
			date: props.date,
		});
	}

	return (
		<form name="expenseForm" onSubmit={handleSubmit}>
			<div className={styles.formGroup}>
				<select
					name="newExpense_currencySelect"
					id="newExpense_currencySelect"
					className={styles.currencySelect}
					value={formState.currency}
					onChange={(event) => {
						const currency = event.target.value as ECurrency;

						dispatch({
							type: EExpenseFormReducerAction.SET_CURRENCY,
							currency,
						});
					}}
				>
					{/* @todo Add a placeholder */}
					{/* <option value="" disabled /> */}
					{Object.values(ECurrency).map((currency) => {
						return (
							<option key={currency} value={currency}>
								{currency}
							</option>
						);
					})}
				</select>

				<AmountInput
					value={formState.amount}
					onChange={(amount: number) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_AMOUNT,
							amount,
						});
					}}
					required
				/>

				<button type="submit" className={styles.submitButton}>
					{intl.translate('submitButton')}
				</button>
			</div>

			{/* <br /> */}

			{/* <div>
				<CurrencyInput
					value={formState.currency}
					onChange={(currency: ECurrency) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_CURRENCY,
							currency,
						});
					}}
				/>
			</div> */}

			<div className={styles.formGroup}>
				<VenuePills
					onSelect={(payload?: { venueId: string; categoryId: string }) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_VENUE,
							venue: payload?.venueId,
							category: payload?.categoryId,
						});
					}}
				/>
			</div>

			<div className={styles.formGroup}>
				<CategoryPills
					value={formState.category}
					onSelect={(id?: string) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_CATEGORY,
							category: id,
						});
					}}
				/>
			</div>

			<div className={styles.formGroup}>
				<DateInput
					initialValue={formState.date}
					onChange={(date: string) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_DATE,
							date,
						});
					}}
				/>
			</div>

			<div className={styles.formGroup}>
				<DescriptionInput
					value={formState.description}
					onChange={(description: string) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_DESCRIPTION,
							description: description,
						});
					}}
				/>
			</div>
		</form>
	);
}

function convertDateToModelValue(date: string): TISODateString {
	return new Date(date).toISOString();
}

export const enum EExpenseFormReducerAction {
	SET_AMOUNT = 'setAmount',
	SET_CURRENCY = 'setCurrency',
	SET_DESCRIPTION = 'setDescription',
	SET_DATE = 'setDate',
	SET_CATEGORY = 'setCategory',
	SET_VENUE = 'setVenue',
	RESET = 'reset',
}

type TExpenseFormReducerAction = Partial<TExpenseFormReducerState> & {
	type: EExpenseFormReducerAction;
};

type TExpenseFormReducerState = {
	amount: number;
	currency: ECurrency;
	description: TDescription;
	category: TCategory | null;
	venue: Id | null;
	date: TISODateString;
};

/**
 * @todo Get rid of "as"
 */
function expenseFormReducer(
	state: TExpenseFormReducerState,
	action: TExpenseFormReducerAction & Partial<TExpenseFormReducerState>,
) {
	switch (action.type) {
		case EExpenseFormReducerAction.SET_AMOUNT: {
			let amount = action.amount as number;

			return {
				...state,
				amount,
			};
		}
		case EExpenseFormReducerAction.SET_CURRENCY: {
			let currency = action.currency as ECurrency;

			return {
				...state,
				currency,
			};
		}
		case EExpenseFormReducerAction.SET_DESCRIPTION: {
			let description = action.description as string;

			return {
				...state,
				description,
			};
		}
		case EExpenseFormReducerAction.SET_DATE: {
			let date = action.date as string;

			return {
				...state,
				date,
			};
		}
		case EExpenseFormReducerAction.SET_CATEGORY: {
			let category = action.category as string;

			return {
				...state,
				category,
			};
		}
		case EExpenseFormReducerAction.SET_VENUE: {
			let venue = action.venue as string;
			let category = action.category as string;

			return {
				...state,
				venue,
				category,
			};
		}
		case EExpenseFormReducerAction.RESET: {
			let amount = action.amount as number;
			let currency = action.currency as ECurrency;
			let description = action.description as string;
			let date = action.date as string;
			let category = action.category as string;

			return {
				...state,
				amount,
				currency,
				description,
				date,
				category,
			};
		}
	}
}
