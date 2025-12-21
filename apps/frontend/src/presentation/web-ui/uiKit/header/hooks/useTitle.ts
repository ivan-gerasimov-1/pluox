import { useMemo } from 'react';

import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { THeaderProps } from '@root/presentation/web-ui/uiKit/header/header';

export function useTitle(props: THeaderProps) {
	const translations = useMemo(() => {
		return {
			[ELocaleCode.EN_US]: {
				title: props.title[ELocaleCode.EN_US],
			},
			[ELocaleCode.RU_RU]: {
				title: props.title[ELocaleCode.RU_RU],
			},
		};
	}, [props.title]);

	const { translate } = useIntl(translations);

	return translate('title');
}
