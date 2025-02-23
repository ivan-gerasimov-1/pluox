import type { TLocaleCode } from '@root/core/modules/intl/domain/types';
import {
	TBaseScope,
	TScopedTranslateFunction,
} from '@root/presentation/web-ui/modules/intl/useIntl/types';

export function createScopedTranslateFunction<TScope extends TBaseScope>(
	scope: Record<TLocaleCode, TScope>,
	localeCode: TLocaleCode,
): TScopedTranslateFunction<TScope> {
	return function <TKey extends keyof TScope>(key: TKey): TScope[TKey] {
		return scope[localeCode][key];
	};
}
