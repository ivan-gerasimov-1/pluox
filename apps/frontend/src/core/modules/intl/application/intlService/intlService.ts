import type { IAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
import type { TCurrency } from '@root/core/modules/currency/domain/types';
import { DECIMAL_SEPARATORS } from '@root/core/modules/intl/domain/constants';
import { UnsupportedDecimalSeparatorError } from '@root/core/modules/intl/domain/errors';
import type { IIntlService } from '@root/core/modules/intl/application/intlService/types';
import type {
	TDecimalSeparator,
	TLocaleCode,
} from '@root/core/modules/intl/domain/types';
import type { INumberParser } from '@root/core/modules/intl/domain/numberParser/types';
import type { ICurrencyFormatter } from '@root/core/modules/intl/domain/currencyFormatter/types';
import type { IDateFormatter } from '@root/core/modules/intl/domain/dateFormatter/types';

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

	private isDecimalSeparator(value: any): value is TDecimalSeparator {
		return DECIMAL_SEPARATORS.includes(value);
	}
}
