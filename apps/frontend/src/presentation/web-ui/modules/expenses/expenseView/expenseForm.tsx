import { useReducer } from 'react';

import { ECurrency } from '@core/infrastructure/currency/types';

import type { TCategory, TComment, TISODateString } from '@domain/types';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { AmountInput } from '@root/presentation/web-ui/modules/expenses/expenseView/components/amountInput/amountInput';
import { CategoryPills } from '@root/presentation/web-ui/modules/expenses/expenseView/components/categoryPills/categoryPills';
import { CommentInput } from '@root/presentation/web-ui/modules/expenses/expenseView/components/commentInput/commentInput';
import { DateInput } from '@root/presentation/web-ui/modules/expenses/expenseView/components/dateInput/dateInput';
import { expenseFormI18n } from '@root/presentation/web-ui/modules/expenses/expenseView/expenseForm.i18n';

import styles from './expenseForm.module.css';

export type TExpenseFormProps = {
	onSubmit(payload: {
		amount: number;
		currency: ECurrency;
		comment: TComment;
		category: TCategory;
		date: TISODateString;
	}): void;

	amount: number;
	currency: ECurrency;
	comment: TComment;
	category: TCategory;
	date: TISODateString;
};

export function ExpenseForm(props: TExpenseFormProps) {
	let intl = useIntl(expenseFormI18n);
	let [formState, dispatch] = useReducer(expenseFormReducer, {
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
		dispatch({
			type: EExpenseFormReducerAction.RESET,

			amount: props.amount,
			currency: props.currency,
			comment: props.comment,
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
				<CategoryPills
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
				<CommentInput
					value={formState.comment}
					onChange={(comment: string) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_COMMENT,
							comment,
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
	SET_COMMENT = 'setComment',
	SET_DATE = 'setDate',
	SET_CATEGORY = 'setCategory',
	RESET = 'reset',
}

type TExpenseFormReducerAction = Partial<TExpenseFormReducerState> & {
	type: EExpenseFormReducerAction;
};

type TExpenseFormReducerState = {
	amount: number;
	currency: ECurrency;
	comment: TComment;
	category: TCategory;
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
		case EExpenseFormReducerAction.SET_COMMENT: {
			let comment = action.comment as string;

			return {
				...state,
				comment,
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
		case EExpenseFormReducerAction.RESET: {
			let amount = action.amount as number;
			let currency = action.currency as ECurrency;
			let comment = action.comment as string;
			let date = action.date as string;
			let category = action.category as string;

			return {
				...state,
				amount,
				currency,
				comment,
				date,
				category,
			};
		}
	}
}
