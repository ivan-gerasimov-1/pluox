const MONTH_NAME_TOKENS = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december',
] as const;

export type TMonthNameToken = (typeof MONTH_NAME_TOKENS)[number];

export const enum EMonthNameToken {
	JANUARY = 'january',
	FEBRUARY = 'february',
	MARCH = 'march',
	APRIL = 'april',
	MAY = 'may',
	JUNE = 'june',
	JULY = 'july',
	AUGUST = 'august',
	SEPTEMBER = 'september',
	OCTOBER = 'october',
	NOVEMBER = 'november',
	DECEMBER = 'december',
}
