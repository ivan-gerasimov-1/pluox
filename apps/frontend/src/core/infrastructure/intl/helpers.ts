import { ELocaleCode } from '@core/infrastructure/intl/enums';

export function getLanguageNameByLocale(locale: ELocaleCode): string {
	return {
		[ELocaleCode.RU_RU]: 'Русский',
		[ELocaleCode.EN_US]: 'English',
	}[locale];
}
