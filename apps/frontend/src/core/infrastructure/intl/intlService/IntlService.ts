import type { IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import type { ECurrency } from '@root/core/modules/currency/domain/types';
import { DECIMAL_SEPARATORS } from '@core/infrastructure/intl/constants';
import { formatCurrency } from '@core/infrastructure/intl/currency';
import { formatDate } from '@core/infrastructure/intl/date';
import type { ELocaleCode } from '@core/infrastructure/intl/enums';
import { UnsupportedDecimalSeparatorError } from '@core/infrastructure/intl/intlService/errors';
import { IIntlService } from '@core/infrastructure/intl/intlService/types';
import { NumberParser } from '@core/infrastructure/intl/numberParser/NumberParser';
import type { TDecimalSeparator } from '@core/infrastructure/intl/types';

export class IntlService implements IIntlService {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly numberParser: NumberParser,
	) {}

	public get locale(): ELocaleCode {
		return this.appConfig.locale;
	}

	public get currency(): ECurrency {
		return this.appConfig.currency;
	}

	public get decimalSeparator(): TDecimalSeparator {
		return this.getDecimalSeparator(this.locale);
	}

	public formatCurrency(
		value: number,
		options?: {
			currency?: ECurrency;
		},
	): string {
		return formatCurrency(
			value,
			options?.currency || this.currency,
			this.locale,
		);
	}

	public formatDate(value: number | string | Date): string {
		return formatDate(value, this.locale);
	}

	public parseNumber(value: string): number {
		return this.numberParser.parse(value);
	}

	/**
	 * @throws {UnsupportedDecimalSeparatorError}
	 */
	private getDecimalSeparator(locale: ELocaleCode): TDecimalSeparator {
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
