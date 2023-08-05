import { ECurrency } from '@core/infrastructure/currency/types';
import styles from './currency-input.module.css';

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
		<fieldset className={styles.container}>
			<label htmlFor="currency_usd" className={styles.radioInput}>
				<input
					name="currency"
					id="currency_usd"
					type="radio"
					className={styles.nativeRadioInput}
					checked={props.value === ECurrency.USD}
					value={ECurrency.USD}
					onChange={handleCurrencyChange}
				/>
				{ECurrency.USD}
			</label>

			<label htmlFor="currency_rub" className={styles.radioInput}>
				<input
					name="currency"
					id="currency_rub"
					type="radio"
					className={styles.nativeRadioInput}
					checked={props.value === ECurrency.RUB}
					value={ECurrency.RUB}
					onChange={handleCurrencyChange}
				/>
				{ECurrency.RUB}
			</label>

			<label htmlFor="currency_gel" className={styles.radioInput}>
				<input
					name="currency"
					id="currency_gel"
					type="radio"
					className={styles.nativeRadioInput}
					checked={props.value === ECurrency.GEL}
					value={ECurrency.GEL}
					onChange={handleCurrencyChange}
				/>
				{ECurrency.GEL}
			</label>
		</fieldset>
	);
}
