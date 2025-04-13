import {
	ECurrency,
	type TCurrency,
} from '@root/core/modules/currency/domain/types';

import styles from './currencyInput.module.css';

type TCurrencyInputProps = {
	value: TCurrency;
	onChange(currency: TCurrency): void;
};

/** @deprecated */
export function CurrencyInput(props: TCurrencyInputProps) {
	function handleCurrencyChange(event: React.ChangeEvent<HTMLInputElement>) {
		const currency = event.target.value;

		/** @todo Remove @ts-expect-error */
		// @ts-expect-error | FIX
		props.onChange(currency);
	}

	return (
		<fieldset className={styles.container}>
			<label htmlFor={ECurrency.USD} className={styles.radioInput}>
				<span className={styles.radioInputTitle}>{ECurrency.USD}</span>

				<input
					type="radio"
					id={ECurrency.USD}
					name="currency"
					className={styles.nativeRadioInput}
					checked={props.value === ECurrency.USD}
					value={ECurrency.USD}
					onChange={handleCurrencyChange}
				/>
			</label>

			<label htmlFor={ECurrency.RUB} className={styles.radioInput}>
				<span className={styles.radioInputTitle}>{ECurrency.RUB}</span>

				<input
					type="radio"
					id={ECurrency.RUB}
					name="currency"
					className={styles.nativeRadioInput}
					checked={props.value === ECurrency.RUB}
					value={ECurrency.RUB}
					onChange={handleCurrencyChange}
				/>
			</label>

			<label htmlFor={ECurrency.GEL} className={styles.radioInput}>
				<span className={styles.radioInputTitle}>{ECurrency.GEL}</span>

				<input
					type="radio"
					id={ECurrency.GEL}
					name="currency"
					className={styles.nativeRadioInput}
					checked={props.value === ECurrency.GEL}
					value={ECurrency.GEL}
					onChange={handleCurrencyChange}
				/>
			</label>
		</fieldset>
	);
}
