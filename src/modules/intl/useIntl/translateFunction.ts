import { ELocaleCode } from '@modules/intl';
import {
	TBaseScope,
	TScopedTranslateFunction,
} from '@modules/intl/useIntl/types';

export function createScopedTranslateFunction<TScope extends TBaseScope>(
	scope: Record<ELocaleCode, TScope>,
	localeCode: ELocaleCode
): TScopedTranslateFunction<TScope> {
	return function <TKey extends keyof TScope>(key: TKey): TScope[TKey] {
		return scope[localeCode][key];
	};
}
