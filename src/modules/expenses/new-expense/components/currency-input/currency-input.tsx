import { ECurrency } from '@domain/expense/types';

type TCurrencyInputProps = {
	value: ECurrency;
	onChange(currency: ECurrency): void;
};

export function CurrencyInput(props: TCurrencyInputProps) {
	function handleCurrencyChange(event: React.ChangeEvent<HTMLInputElement>) {
		const currency = event.target.value;

		/** @todo */
		// @ts-expect-error
		props.onChange(currency);
	}

	return (
		<>
			<label htmlFor="currency_usd">
				<input
					name="currency"
					id="currency_usd"
					type="radio"
					checked={props.value === ECurrency.USD}
					value={ECurrency.USD}
					onChange={handleCurrencyChange}
				/>
				{ECurrency.USD}
			</label>

			<label htmlFor="currency_rub">
				<input
					name="currency"
					id="currency_rub"
					type="radio"
					checked={props.value === ECurrency.RUB}
					value={ECurrency.RUB}
					onChange={handleCurrencyChange}
				/>
				{ECurrency.RUB}
			</label>

			<label htmlFor="currency_gel">
				<input
					name="currency"
					id="currency_gel"
					type="radio"
					checked={props.value === ECurrency.GEL}
					value={ECurrency.GEL}
					onChange={handleCurrencyChange}
				/>
				{ECurrency.GEL}
			</label>
		</>
	);
}
