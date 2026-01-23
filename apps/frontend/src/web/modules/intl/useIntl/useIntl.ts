import type { TLocaleCode } from '@pluox/core/src/modules/intl/domain/types';
import { useMemo } from 'react';

import { createScopedTranslateFunction } from '@/web/modules/intl/useIntl/translateFunction';
import { TBaseScope, TUseIntl } from '@/web/modules/intl/useIntl/types';
import { EServiceToken } from '@/web/modules/serviceContainer/enums';
import { useService } from '@/web/modules/serviceContainer/useService';

export function useIntl<TScope extends TBaseScope>(
	scope: Record<TLocaleCode, TScope>,
): TUseIntl<TScope> {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let localeCode = intlService.locale;

	const intl: TUseIntl<TScope> = useMemo((): TUseIntl<TScope> => {
		return {
			localeCode,
			translate: createScopedTranslateFunction(scope, localeCode),
		};
	}, [localeCode, scope]);

	return intl;
}
