import { ELocaleCode } from '@modules/intl';

export class NumberParser {
	#group: RegExp = new RegExp('');
	#decimal: RegExp = new RegExp('');
	#numeral: RegExp = new RegExp('');
	#index: any;

	private constructor(locale: ELocaleCode) {
		const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
		const numerals = [
			...new Intl.NumberFormat(locale, { useGrouping: false }).format(
				9876543210
			),
		].reverse();
		const index = new Map(numerals.map((d, i) => [d, i]));

		this.#group = new RegExp(
			`[${parts.find((d): boolean => d.type === 'group')?.value}]`,
			'g'
		);
		this.#decimal = new RegExp(
			`[${parts.find((d): boolean => d.type === 'decimal')?.value}]`
		);
		this.#numeral = new RegExp(`[${numerals.join('')}]`, 'g');
		this.#index = (d: string) => index.get(d);
	}

	public static create(locale: ELocaleCode): NumberParser {
		return new NumberParser(locale);
	}

	public parse(value: string): number {
		let parsedValue = value
			.trim()
			.replace(this.#group, '')
			.replace(this.#decimal, '.')
			.replace(this.#numeral, this.#index);

		return parsedValue ? +parsedValue : NaN;
	}
}
