import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import objectSupport from 'dayjs/plugin/objectSupport';

import type { TISODateString } from '@root/core/domain/types';
import type { TMonth } from '@root/core/domain/amount/useCases/types';
import type { IIntlService } from '@root/core/infrastructure/intl/intlService/types';
import type { ITemporal } from '@root/modules/temporal/types';

/**
 * @todo Load additional locales in IntlService
 */
import 'dayjs/locale/ru';

export class Temporal implements ITemporal {
	static readonly #MONTH_LIST: TMonth[] = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
	] as const;

	readonly #dateFn = dayjs;

	constructor(private readonly intl: IIntlService) {
		dayjs.extend(utc);
		dayjs.extend(timezone);
		dayjs.extend(objectSupport);
	}

	public getMonth(month?: TMonth): string {
		let localeCode = this.intl.locale;

		return this.#dateFn({
			month,
		})
			.locale(localeCode)
			.format('MMMM');
	}

	public getStartOfMonth(month?: TMonth): TISODateString {
		return this.#dateFn({
			month,
		})
			.startOf('month')
			.toISOString();
	}

	public getEndOfMonth(month?: TMonth): TISODateString {
		return this.#dateFn({
			month,
		})
			.endOf('month')
			.toISOString();
	}

	public getTimezone(): string {
		return this.#dateFn.tz.guess();
	}

	public getMonthList(): TMonth[] {
		return Temporal.#MONTH_LIST;
	}
}
