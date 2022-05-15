import { ELocaleCode } from '@modules/intl';
import { createScopedTranslateFunction } from '@modules/intl/useIntl/translateFunction';
import { TBaseScope, TUseIntl } from '@modules/intl/useIntl/types';
import { useMemo } from 'react';

export function useIntl<TScope extends TBaseScope>(
	scope: Record<ELocaleCode, TScope>
): TUseIntl<TScope> {
	let localeCode = ELocaleCode.RU_RU;

	const intl: TUseIntl<TScope> = useMemo((): TUseIntl<TScope> => {
		return {
			localeCode,
			translate: createScopedTranslateFunction(scope, localeCode),
		};
	}, [localeCode, scope]);

	return intl;
}
