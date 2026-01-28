import type { TLocaleCode } from '@/web/modules/intl/types';

import type { TBaseScope, TScopedTranslateFunction } from './types';

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
