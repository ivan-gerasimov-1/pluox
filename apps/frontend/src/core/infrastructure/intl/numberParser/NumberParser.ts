import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';

/**
 * @todo Define interface
 */
export class NumberParser {
	readonly #group: RegExp = new RegExp('');
	readonly #decimal: RegExp = new RegExp('');
	readonly #numeral: RegExp = new RegExp('');
	readonly #index: any;

	constructor(appConfig: IAppConfig) {
		let locale = appConfig.locale;

		const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
		const numerals = [
			...new Intl.NumberFormat(locale, { useGrouping: false }).format(
				9876543210,
			),
		].reverse();
		const index = new Map(numerals.map((d, i) => [d, i]));

		this.#group = new RegExp(
			`[${parts.find((d): boolean => d.type === 'group')?.value}]`,
			'g',
		);
		this.#decimal = new RegExp(
			`[${parts.find((d): boolean => d.type === 'decimal')?.value}]`,
		);
		this.#numeral = new RegExp(`[${numerals.join('')}]`, 'g');
		this.#index = (d: string) => index.get(d);
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
