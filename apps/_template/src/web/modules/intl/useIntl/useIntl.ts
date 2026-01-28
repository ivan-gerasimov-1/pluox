import { useMemo } from 'react';

import { ELocaleCode } from '@/web/modules/intl/enums';
import type { TLocaleCode } from '@/web/modules/intl/types';
import { createScopedTranslateFunction } from '@/web/modules/intl/useIntl/translateFunction';
import { TBaseScope, TUseIntl } from '@/web/modules/intl/useIntl/types';

export function useIntl<TScope extends TBaseScope>(
	scope: Record<TLocaleCode, TScope>,
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
