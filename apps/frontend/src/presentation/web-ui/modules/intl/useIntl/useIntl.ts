import type { TLocaleCode } from '@/core/modules/intl/domain/types';
import { createScopedTranslateFunction } from '@/presentation/web-ui/modules/intl/useIntl/translateFunction';
import {
	TBaseScope,
	TUseIntl,
} from '@/presentation/web-ui/modules/intl/useIntl/types';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import { useMemo } from 'react';

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
