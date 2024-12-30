import { useMemo } from 'react';

import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

import { createScopedTranslateFunction } from '@root/presentation/web-ui/modules/intl/useIntl/translateFunction';
import {
	TBaseScope,
	TUseIntl,
} from '@root/presentation/web-ui/modules/intl/useIntl/types';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

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
