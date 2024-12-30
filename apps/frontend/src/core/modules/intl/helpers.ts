import { ELocaleCode } from '@root/core/modules/intl/enums';

export function getLanguageNameByLocale(locale: ELocaleCode): string {
	return {
		[ELocaleCode.RU_RU]: 'Русский',
		[ELocaleCode.EN_US]: 'English',
	}[locale];
}
