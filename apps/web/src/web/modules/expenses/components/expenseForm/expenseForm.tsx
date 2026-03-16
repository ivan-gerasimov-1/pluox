import {
	Controller,
	useForm,
	type Control,
	type UseFormSetValue,
} from 'react-hook-form';

import type { TISODateString } from '@core/domain/temporal/types';
import type { Id, TCategory, TDescription } from '@core/domain/types';

import { ECurrency, type TCurrency } from '@core/modules/currency/domain/types';

import { AmountInput } from '@/web/modules/expenses/components/expenseForm/components/amountInput/amountInput';
import { CategoryPills } from '@/web/modules/expenses/components/expenseForm/components/categoryPills/categoryPills';
import { DescriptionInput } from '@/web/modules/expenses/components/expenseForm/components/commentInput/descriptionInput';
import { VenuePills } from '@/web/modules/expenses/components/expenseForm/components/venuePills/venuePills';
import { expenseFormI18n } from '@/web/modules/expenses/components/expenseForm/expenseForm.i18n';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';

import { Button } from '@kit/button/button';
import { Input } from '@kit/input/input';

export type TExpenseFormProps = {
	amount: number;
	currency: TCurrency;
	description: TDescription;
	category: TCategory | null;
	venue: Id | null;
	date: TISODateString;

	onSubmit(payload: {
		amount: number;
		currency: TCurrency;
		description: TDescription;
		category: TCategory | null;
		venue: Id | null;
		date: TISODateString;
	}): void;
};

type TExpenseFormState = {
	amount: number;
	currency: TCurrency;
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
			category: formState.category ?? null,
			venue: formState.venue ?? null,
			date: new Date(formState.date).toISOString(),
		});

		reset();
	});

	return (
		<form
			name="expenseForm"
			className="gap-6 flex flex-col"
			onSubmit={onSubmit}
		>
			<div className="flex">
				<Input asChild>
					<select
						className="w-auto! rounded-tr-none rounded-br-none border-r-0"
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
				</Input>

				<AmountInputController control={control} setValue={setValue} />

				<Button type="submit" className="ms-3 px-12">
					{intl.translate('submitButton')}
				</Button>
			</div>

			<VenuePillsController control={control} setValue={setValue} />

			<CategoryPillsController control={control} />

			<Input type="datetime-local" {...register('date')} />

			<DescriptionInput {...register('description')} />
		</form>
	);
}

/** @todo */
// oxlint-disable react/no-multi-comp
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

/** @todo */
// oxlint-disable react/no-multi-comp
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

/** @todo */
// oxlint-disable react/no-multi-comp
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
