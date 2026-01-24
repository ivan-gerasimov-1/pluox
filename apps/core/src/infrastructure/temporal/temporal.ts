import type {
	ITemporal,
	TISODateString,
	TMonth,
	TYear,
} from '@core/domain/temporal/types';
import { InvalidMonthError } from '@core/infrastructure/temporal/errors';
import { monthGuard } from '@core/infrastructure/temporal/typeGuards';
import type { IIntlService } from '@core/modules/intl/application/intlService/types';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
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

	public format(options: { date?: TISODateString; format: string }): string {
		return this.#dateFn(options.date) //
			.locale(this.intl.locale)
			.format(options.format);
	}

	public getMonth(month?: TMonth): string {
		let localeCode = this.intl.locale;

		return this.#dateFn({
			month,
		})
			.locale(localeCode)
			.format('MMMM');
	}

	public getCurrentMonth(): TMonth {
		const month = new Date().getMonth();

		if (!monthGuard(month)) {
			throw new InvalidMonthError(month);
		}

		return month;
	}

	public getStartOfMonth(month?: TMonth, year?: TYear): TISODateString {
		return this.#dateFn({
			month,
			year,
		})
			.startOf('month')
			.toISOString();
	}

	public getEndOfMonth(month?: TMonth, year?: TYear): TISODateString {
		return this.#dateFn({
			month,
			year,
		})
			.endOf('month')
			.toISOString();
	}

	public getStartOfYear(year?: TYear): TISODateString {
		return this.#dateFn({
			year,
		})
			.startOf('year')
			.toISOString();
	}

	public getEndOfYear(year?: TYear): TISODateString {
		return this.#dateFn({
			year,
		})
			.endOf('year')
			.toISOString();
	}

	public getStartOfDay(): TISODateString {
		return this.#dateFn().startOf('day').toISOString();
	}

	public getEndOfDay(): TISODateString {
		return this.#dateFn().endOf('day').toISOString();
	}

	public getTimezone(): string {
		return this.#dateFn.tz.guess();
	}

	public getMonthList(): TMonth[] {
		return Temporal.#MONTH_LIST;
	}

	public getISODateString(): TISODateString {
		return this.#dateFn().toISOString();
	}
}
