import type { TCurrency } from '@/core/modules/currency/domain/types';
import type { IIntlService } from '@/core/modules/intl/application/intlService/types';
import { DECIMAL_SEPARATORS } from '@/core/modules/intl/domain/constants';
import type { ICurrencyFormatter } from '@/core/modules/intl/domain/currencyFormatter/types';
import type { IDateFormatter } from '@/core/modules/intl/domain/dateFormatter/types';
import { UnsupportedDecimalSeparatorError } from '@/core/modules/intl/domain/errors';
import type { INumberParser } from '@/core/modules/intl/domain/numberParser/types';
import type {
	TDecimalSeparator,
	TLocaleCode,
} from '@/core/modules/intl/domain/types';
import type { IAppConfig } from '@/core/modules/settings/domain/appConfig/types';

export class IntlService implements IIntlService {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly numberParser: INumberParser,
		private readonly currencyFormatter: ICurrencyFormatter,
		private readonly dateFormatter: IDateFormatter,
	) {}

	public get locale(): TLocaleCode {
		return this.appConfig.locale;
	}

	public get currency(): TCurrency {
		return this.appConfig.currency;
	}

	public get decimalSeparator(): TDecimalSeparator {
		return this.getDecimalSeparator(this.locale);
	}

	public formatCurrency(
		value: number,
		options?: {
			currency?: TCurrency;
			hideDecimal?: boolean;
		},
	): string {
		return this.currencyFormatter.format(
			value,
			options?.currency || this.currency,
			this.locale,
			{
				hideDecimal: options?.hideDecimal,
			},
		);
	}

	public formatDate(value: number | string | Date): string {
		return this.dateFormatter.format(value, this.locale);
	}

	public parseNumber(value: string): number {
		return this.numberParser.parse(value);
	}

	/**
	 * @throws {UnsupportedDecimalSeparatorError}
	 */
	private getDecimalSeparator(locale: TLocaleCode): TDecimalSeparator {
		let decimalSeaparator = (1.1).toLocaleString(locale).substring(1, 2);

		if (!this.isDecimalSeparator(decimalSeaparator)) {
			throw new UnsupportedDecimalSeparatorError(decimalSeaparator);
		}

		return decimalSeaparator;
	}

	private isDecimalSeparator(value: unknown): value is TDecimalSeparator {
		return DECIMAL_SEPARATORS.includes(
			// @ts-expect-error | typeguard
			value,
		);
	}
}
