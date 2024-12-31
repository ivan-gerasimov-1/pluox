import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

const languageNameByLocale = Object.create({
	[ELocaleCode.RU_RU]: 'Русский',
	[ELocaleCode.EN_US]: 'English',
});

export function getLanguageNameByLocale(locale: ELocaleCode): string {
	return languageNameByLocale[locale];
}
