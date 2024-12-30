import type { IAppConfig } from '@root/core/infrastructure/appConfig/appConfig';
import type { ECurrency } from '@root/core/modules/currency/domain/types';
import { DECIMAL_SEPARATORS } from '@root/core/modules/intl/domain/constants';
import { formatCurrency } from '@root/core/modules/intl/application/currency';
import { formatDate } from '@root/core/modules/intl/application/date';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import { UnsupportedDecimalSeparatorError } from '@root/core/modules/intl/domain/errors';
import type { IIntlService } from '@root/core/modules/intl/application/intlService/types';
import type { TDecimalSeparator } from '@root/core/modules/intl/domain/types';
import type { INumberParser } from '@root/core/modules/intl/domain/numberParser/types';

export class IntlService implements IIntlService {
	constructor(
		private readonly appConfig: IAppConfig,
		private readonly numberParser: INumberParser,
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
			hideDecimal?: boolean;
		},
	): string {
		return formatCurrency(
			value,
			options?.currency || this.currency,
			this.locale,
			{
				hideDecimal: options?.hideDecimal,
			},
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
