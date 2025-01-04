export type TISODateString = string;

export type TMonth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type TYear = number;

export type TDateParts = {
	month: TMonth;
	year: TYear;
};

export interface ITemporal {
	getMonth(month?: TMonth): string;
	getCurrentMonth(): TMonth;
	getStartOfMonth(month?: TMonth): TISODateString;
	getEndOfMonth(month?: TMonth): TISODateString;
	getStartOfDay(): TISODateString;
	getEndOfDay(): TISODateString;
	getTimezone(): string;
	getMonthList(): TMonth[];
	getISODateString(): TISODateString;
}
