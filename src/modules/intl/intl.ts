import { ECurrency } from '@domain/expense/types';
import { formatCurrency } from '@modules/intl/currency';
import { formatDate } from '@modules/intl/date';
import { ELocaleCode } from '@modules/intl/enums';
import { NumberParser } from '@modules/intl/number-parser';

const DECIMAL_SEPARATORS = [',', '.'] as const;

type TDecimalSeparator = typeof DECIMAL_SEPARATORS[number];

export class IntlService {
	static #locale = ELocaleCode.RU_RU;
	static #currency = ECurrency.USD;

	public static get locale(): ELocaleCode {
		return this.#locale;
	}

	public static get DECIMAL_SEPARATOR(): TDecimalSeparator {
		return this.getDecimalSeparator(this.#locale);
	}

	public static get numberParser(): NumberParser {
		return NumberParser.create(this.#locale);
	}

	public static formatCurrency(value: number, currency?: ECurrency): string {
		return formatCurrency(value, currency || this.#currency, this.#locale);
	}

	public static formatDate(value: number | string | Date) {
		return formatDate(value, this.#locale);
	}

	/**
	 * @throws {UnsupportedDecimalSeparatorError}
	 */
	private static getDecimalSeparator(locale: ELocaleCode): TDecimalSeparator {
		let decimalSeaparator = (1.1).toLocaleString(locale).substring(1, 2);

		if (!this.isDecimalSeparator(decimalSeaparator)) {
			throw new UnsupportedDecimalSeparatorError(decimalSeaparator);
		}

		return decimalSeaparator;
	}

	private static isDecimalSeparator(value: any): value is TDecimalSeparator {
		return DECIMAL_SEPARATORS.includes(value);
	}
}

class UnsupportedDecimalSeparatorError extends Error {
	constructor(separator: string) {
		super(`Unsupported decimal separator: ${separator}`);
	}
}
