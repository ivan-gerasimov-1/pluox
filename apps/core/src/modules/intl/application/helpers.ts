import { ELocaleCode } from '@pluox/core/src/modules/intl/domain/enums';
import type { TLocaleCode } from '@pluox/core/src/modules/intl/domain/types';

const languageNameByLocale = Object.create({
	[ELocaleCode.RU_RU]: 'Русский',
	[ELocaleCode.EN_US]: 'English',
});

export function getLanguageNameByLocale(locale: TLocaleCode): string {
	return languageNameByLocale[locale];
}
