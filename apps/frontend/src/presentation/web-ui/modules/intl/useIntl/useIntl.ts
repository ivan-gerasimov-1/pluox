import { useMemo } from 'react';

import { ELocaleCode } from '@core/infrastructure/intl/enums';

import { createScopedTranslateFunction } from '@root/presentation/web-ui/modules/intl/useIntl/translateFunction';
import {
	TBaseScope,
	TUseIntl,
} from '@root/presentation/web-ui/modules/intl/useIntl/types';
import { EServiceToken } from '@modules/serviceContainer/types';
import { useService } from '@modules/serviceContainer/react/useService';

export function useIntl<TScope extends TBaseScope>(
	scope: Record<ELocaleCode, TScope>,
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
