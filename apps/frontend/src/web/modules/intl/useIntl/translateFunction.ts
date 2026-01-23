import type { TLocaleCode } from '@/core/modules/intl/domain/types';

import {
	TBaseScope,
	TScopedTranslateFunction,
} from '@/web/modules/intl/useIntl/types';

export function createScopedTranslateFunction<TScope extends TBaseScope>(
	scope: Record<TLocaleCode, TScope>,
	localeCode: TLocaleCode,
): TScopedTranslateFunction<TScope> {
	return function scopedTranslateFunction<TKey extends keyof TScope>(
		key: TKey,
	): TScope[TKey] {
		return scope[localeCode][key];
	};
}
