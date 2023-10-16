import { ECurrency } from '@core/infrastructure/currency/types';
import type { TISODateString } from '@domain/types';
import { AmountInput } from '@modules/expenses/expenseView/components/amountInput/amountInput';
import { CategoryInput } from '@modules/expenses/expenseView/components/categoryInput/CategoryInput';
import { CommentInput } from '@modules/expenses/expenseView/components/commentInput/CommentInput';
import { CurrencyInput } from '@modules/expenses/expenseView/components/currencyInput/currencyInput';
import { DateInput } from '@modules/expenses/expenseView/components/dateInput/DateInput';
import { newExpenseI18n } from '@modules/expenses/expenseView/expenseView.i18n';
import { useIntl } from '@modules/intl';
import { useReducer } from 'react';
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
	let intl = useIntl(newExpenseI18n);
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
				<AmountInput
					value={formState.amount}
					onChange={(amount: number) => {
						dispatch({
							type: EExpenseFormReducerAction.SET_AMOUNT,
							amount,
						});
					}}
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

export const EExpenseFormReducerAction = {
	SET_AMOUNT: Symbol('setAmount'),
	SET_CURRENCY: Symbol('setCurrency'),
	SET_COMMENT: Symbol('setComment'),
	SET_DATE: Symbol('setDate'),
	SET_CATEGORY: Symbol('setCategory'),
	RESET: Symbol('reset'),
};

/** @todo Add types */
// @ts-expect-error
function expenseFormReducer(state, action) {
	switch (action.type) {
		case EExpenseFormReducerAction.SET_AMOUNT: {
			return {
				...state,
				amount: action.amount,
			};
		}
		case EExpenseFormReducerAction.SET_CURRENCY: {
			return {
				...state,
				currency: action.currency,
			};
		}
		case EExpenseFormReducerAction.SET_COMMENT: {
			return {
				...state,
				comment: action.comment,
			};
		}
		case EExpenseFormReducerAction.SET_DATE: {
			return {
				...state,
				date: action.date,
			};
		}
		case EExpenseFormReducerAction.SET_CATEGORY: {
			return {
				...state,
				category: action.category,
			};
		}
		case EExpenseFormReducerAction.RESET: {
			return {
				amount: action.amount,
				currency: action.currency,
				comment: action.comment,
				date: action.date,
				category: action.category,
			};
		}
	}
}
