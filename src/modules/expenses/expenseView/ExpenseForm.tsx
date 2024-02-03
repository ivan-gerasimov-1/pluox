import { ECurrency } from '@core/infrastructure/currency/types';
import type { TCategory, TISODateString } from '@domain/types';
import { AmountInput } from '@modules/expenses/expenseView/components/amountInput/amountInput';
import { CategoryInput } from '@modules/expenses/expenseView/components/categoryInput/CategoryInput';
import { CommentInput } from '@modules/expenses/expenseView/components/commentInput/CommentInput';
import { CurrencyInput } from '@modules/expenses/expenseView/components/currencyInput/currencyInput';
import { DateInput } from '@modules/expenses/expenseView/components/dateInput/DateInput';
import { expenseFormI18n } from '@modules/expenses/expenseView/expenseForm.i18n';
import { useIntl } from '@modules/intl';
import { useReducer } from 'react';
import styles from './expenseForm.module.css';

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
	category: TCategory;
	date: string;
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

					<option key={ECurrency.EUR} value={ECurrency.EUR}>
						{ECurrency.EUR}
					</option>
					<option key={ECurrency.GEL} value={ECurrency.GEL}>
						{ECurrency.GEL}
					</option>
					<option key={ECurrency.RUB} value={ECurrency.RUB}>
						{ECurrency.RUB}
					</option>
					<option key={ECurrency.USD} value={ECurrency.USD}>
						{ECurrency.USD}
					</option>
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

			<br />

			<div>
				<CurrencyInput
					value={formState.currency}
					onChange={(currency: ECurrency) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_CURRENCY,
							currency,
						});
					}}
				/>
			</div>

			<br />

			<div className={styles.formGroup}>
				<div>
					<CategoryInput
						value={formState.category}
						onChange={(id: string) => {
							dispatch({
								type: EExpenseFormReducerAction.SET_CATEGORY,
								category: id,
							});
						}}
					/>
				</div>

				<div className={styles.spacer} />

				<div className={styles['formGroupItem--2-3']}>
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
			</div>

			<br />

			<div>
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
	comment: string;
	category: TCategory;
	date: string;
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
