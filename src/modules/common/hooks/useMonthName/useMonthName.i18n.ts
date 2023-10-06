import { ELocaleCode } from '@core/infrastructure/intl/enums';
import type { TMonthNameToken } from '@modules/common/hooks/useMonthName/types';

export const useMonthNameI18n: {
	[key in ELocaleCode]: Record<TMonthNameToken, string>;
} = {
	[ELocaleCode.RU_RU]: {
		january: 'Январь',
		february: 'Февраль',
		march: 'Март',
		april: 'Апрель',
		may: 'Май',
		june: 'Июнь',
		july: 'Июль',
		august: 'Август',
		september: 'Сентябрь',
		october: 'Октябрь',
		november: 'Ноябрь',
		december: 'Декабрь',
	},
	[ELocaleCode.EN_US]: {
		january: 'January',
		february: 'February',
		march: 'March',
		april: 'April',
		may: 'May',
		june: 'June',
		july: 'July',
		august: 'August',
		september: 'September',
		october: 'October',
		november: 'November',
		december: 'December',
	},
};
