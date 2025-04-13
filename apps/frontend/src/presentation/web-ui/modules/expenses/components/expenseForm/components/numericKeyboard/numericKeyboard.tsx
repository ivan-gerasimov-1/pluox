import styles from './numericKeyboard.module.css';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type TDigit = (typeof DIGITS)[number];

function isDigit(value: string | number): value is TDigit {
	const possibleDigit = Number.parseInt(
		/** @todo Remove @ts-expect-error */
		// @ts-expect-error | FIX
		value,
		10,
	);

	if (Number.isNaN(possibleDigit)) {
		return false;
	}

	return DIGITS.some((digit) => {
		return digit === possibleDigit;
	});
}

const SEPARATORS = [',', '.'] as const;

type TSeparator = (typeof SEPARATORS)[number];

function isSeparator(value: string): value is TSeparator {
	return SEPARATORS.some((separator) => {
		return separator === value;
	});
}

type TNumericKeyboardProps = {
	/** @todo Remove @ts-expect-error */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any;
	onClick(value: TDigit | TSeparator, type: 'digit' | 'separator'): void;
};

export function NumericKeyboard(props: TNumericKeyboardProps) {
	function handleInput(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	): void {
		let value: string =
			/** @todo Remove @ts-expect-error */
			// @ts-expect-error | FIX
			event.target.value;

		if (isDigit(value)) {
			props.onClick(value, 'digit');
			return;
		} else if (isSeparator(value)) {
			props.onClick(value, 'separator');
			return;
		}

		throw new Error(`Unknown input type: ${value}`);
	}

	return (
		<div>
			<div>
				<NumericButton onClick={handleInput} value={1} />
				<NumericButton onClick={handleInput} value={2} />
				<NumericButton onClick={handleInput} value={3} />
			</div>

			<div>
				<NumericButton onClick={handleInput} value={4} />
				<NumericButton onClick={handleInput} value={5} />
				<NumericButton onClick={handleInput} value={6} />
			</div>

			<div>
				<NumericButton onClick={handleInput} value={7} />
				<NumericButton onClick={handleInput} value={8} />
				<NumericButton onClick={handleInput} value={9} />
			</div>

			<div>
				<NumericButton onClick={handleInput} value="," />
				<NumericButton onClick={handleInput} value={0} />
				<NumericButton onClick={handleInput} value="←" />
			</div>
		</div>
	);
}

type TNumericButtonProps = {
	value: TDigit | ',' | '.' | '←';
	onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

function NumericButton(props: TNumericButtonProps): React.ReactElement {
	return (
		<button
			type="button"
			className={styles.numericButton}
			value={props.value}
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}
