import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import { ELocaleCode } from '@root/core/infrastructure/intl/enums';
import type { INumberParser } from '@root/core/infrastructure/intl/numberParser/types';

type IndexReplacer = (digit: string) => string;
type NumberFormatterCache = Map<ELocaleCode, Intl.NumberFormat>;

/**
 * @todo
 * 1. Reinitialize on locale change from outside instead of manually
 * reinitializing on parse
 * 2. Fix index replacer type
 * 3. Clean up previous formatters by locale code
 */
export class NumberParser implements INumberParser {
	private groupRegExp: RegExp;
	private decimalRegExp: RegExp;
	private numeralRegExp: RegExp;

	private indexReplacer: IndexReplacer;

	private locale: ELocaleCode;

	private readonly formatterCache: NumberFormatterCache;

	constructor(private readonly appConfig: IAppConfig) {
		this.groupRegExp = /.*/;
		this.decimalRegExp = /.*/;
		this.numeralRegExp = /.*/;

		this.indexReplacer = (d: string) => d;

		this.locale = ELocaleCode.EN_US;

		this.formatterCache = new Map();

		this.initialize();
	}

	public parse(value: string): number {
		if (this.locale !== this.appConfig.locale) {
			this.initialize();
		}

		console.log(this.formatterCache);

		let parsedValue = value
			.trim()
			.replace(this.groupRegExp, '')
			.replace(this.decimalRegExp, '.')
			.replace(this.numeralRegExp, this.indexReplacer);

		return parsedValue ? +parsedValue : NaN;
	}

	private initialize() {
		this.locale = this.appConfig.locale;

		this.groupRegExp = this.createGroupRegExp();
		this.decimalRegExp = this.createDecimalRegExp();
		this.numeralRegExp = this.createNumeralRegExp();
		/**
		 * @todo
		 */
		/** @ts-expect-error */
		this.indexReplacer = this.createIndexReplacer();
	}

	private createGroupRegExp(): RegExp {
		let parts = this.getParts();
		let group = parts.find((item): boolean => item.type === 'group');

		return new RegExp(`[${group?.value}]`, 'g');
	}

	private createDecimalRegExp(): RegExp {
		let parts = this.getParts();
		let decimal = parts.find((item): boolean => item.type === 'decimal');

		return new RegExp(`[${decimal?.value}]`);
	}

	private createNumeralRegExp(): RegExp {
		let numerals = this.getNumerals();

		return new RegExp(`[${numerals.join('')}]`, 'g');
	}

	private createIndexReplacer() {
		let index = this.getIndex();

		return (digit: string) => {
			return index.get(digit);
		};
	}

	private getParts(): Intl.NumberFormatPart[] {
		let numberFormatter = this.getNumberFormatter();

		let parts = numberFormatter.formatToParts(12345.6);

		return parts;
	}

	private getNumerals(): string[] {
		let numberFormatter = this.getNumberFormatter({
			useGrouping: false,
		});

		let numerals = [...numberFormatter.format(9876543210)].reverse();

		return numerals;
	}

	private getIndex(): Map<string, number> {
		let numerals = this.getNumerals();
		let index = new Map(numerals.map((number, idx) => [number, idx]));

		return index;
	}

	private getNumberFormatter(
		options?: Intl.NumberFormatOptions,
	): Intl.NumberFormat {
		const key = this.appConfig.locale;
		const cacheKey =
			options?.useGrouping !== undefined
				? (`${key}-with-grouping-option` as ELocaleCode)
				: key;

		if (!this.formatterCache.has(cacheKey)) {
			this.formatterCache.set(
				cacheKey,
				new Intl.NumberFormat(this.appConfig.locale, options),
			);
		}

		/**
		 * @todo
		 */
		return this.formatterCache.get(cacheKey) as Intl.NumberFormat;
	}
}
