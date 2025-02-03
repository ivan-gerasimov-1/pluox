import {
	type Control,
	type UseFormSetValue,
	Controller,
	useForm,
} from 'react-hook-form';

import type { Id, TCategory, TDescription } from '@domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';
import { ECurrency } from '@root/core/modules/currency/domain/types';

import { AmountInput } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/components/amountInput/amountInput';
import { CategoryPills } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/components/categoryPills/categoryPills';
import { DescriptionInput } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/components/commentInput/descriptionInput';
import { DateInput } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/components/dateInput/dateInput';
import { VenuePills } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/components/venuePills/venuePills';
import { expenseFormI18n } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/expenseForm.i18n';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import styles from './expenseForm.module.css';

export type TExpenseFormProps = {
	amount: number;
	currency: ECurrency;
	description: TDescription;
	category: TCategory | null;
	venue: Id | null;
	date: TISODateString;

	onSubmit(payload: {
		amount: number;
		currency: ECurrency;
		description: TDescription;
		category: TCategory | null;
		venue: Id | null;
		date: TISODateString;
	}): void;
};

type TExpenseFormState = {
	amount: number;
	currency: ECurrency;
	description: TDescription;
	category: TCategory | null;
	venue: Id | null;
	date: TISODateString;
};

export function ExpenseForm(props: TExpenseFormProps) {
	let intl = useIntl(expenseFormI18n);

	let { register, handleSubmit, control, reset, setValue } =
		useForm<TExpenseFormState>({
			defaultValues: {
				amount: props.amount,
				currency: props.currency,
				description: props.description,
				category: props.category,
				venue: props.venue,
				date: props.date,
			},
		});

	let onSubmit = handleSubmit((formState: TExpenseFormState) => {
		props.onSubmit({
			amount: formState.amount,
			currency: formState.currency,
			description: formState.description,
			category: formState.category || null,
			venue: formState.venue || null,
			date: new Date(formState.date).toISOString(),
		});

		reset();
	});

	return (
		<form name="expenseForm" onSubmit={onSubmit}>
			<div className={styles.formGroup}>
				<select
					id="currency"
					className={styles.currencySelect}
					{...register('currency')}
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

				<AmountInputController control={control} setValue={setValue} />

				<Button type="submit" className={styles.submitButton}>
					{intl.translate('submitButton')}
				</Button>
			</div>

			<div className={styles.formGroup}>
				<VenuePillsController control={control} setValue={setValue} />
			</div>

			<div className={styles.formGroup}>
				<CategoryPillsController control={control} />
			</div>

			<div className={styles.formGroup}>
				<DateInput {...register('date')} />
			</div>

			<div className={styles.formGroup}>
				<DescriptionInput {...register('description')} />
			</div>
		</form>
	);
}

export function AmountInputController({
	control,
	setValue,
}: {
	control: Control<TExpenseFormState>;
	setValue: UseFormSetValue<TExpenseFormState>;
}) {
	return (
		<Controller
			name="amount"
			control={control}
			render={({ field }) => (
				<AmountInput
					{...field}
					onChange={(value: number) => setValue('amount', value)}
					value={field.value}
				/>
			)}
		/>
	);
}

export function VenuePillsController(props: {
	control: Control<TExpenseFormState>;
	setValue: UseFormSetValue<TExpenseFormState>;
}) {
	return (
		<Controller
			name="venue"
			control={props.control}
			render={({ field }) => {
				return (
					<VenuePills
						{...field}
						onSelect={(payload) => {
							props.setValue('category', payload.categoryId ?? null);

							field.onChange(payload.venueId);
						}}
					/>
				);
			}}
		/>
	);
}

export function CategoryPillsController(props: {
	control: Control<TExpenseFormState>;
}) {
	return (
		<Controller
			name="category"
			control={props.control}
			render={({ field }) => (
				<CategoryPills {...field} onSelect={field.onChange} />
			)}
		/>
	);
}
