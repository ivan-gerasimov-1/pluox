import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import { type ECurrency } from '@core/infrastructure/currency/types';
import { formatCurrency } from '@modules/intl/currency';
import { formatDate } from '@modules/intl/date';
import { type ELocaleCode } from '@modules/intl/enums';
import { NumberParser } from '@modules/intl/number-parser';

const DECIMAL_SEPARATORS = [',', '.'] as const;

type TDecimalSeparator = (typeof DECIMAL_SEPARATORS)[number];

export class IntlService {
	static #appConfig: IAppConfig = AppConfig.create();

	static #locale = this.#appConfig.locale;
	static #currency = this.#appConfig.currency;

	public static get locale(): ELocaleCode {
		return this.#locale;
	}

	public static get currency(): ECurrency {
		return this.#currency;
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
