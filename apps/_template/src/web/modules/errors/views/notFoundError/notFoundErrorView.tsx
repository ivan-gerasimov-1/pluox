import { useIntl } from '@/web/modules/intl/useIntl/useIntl';

import { Error } from '@kit/error/error';

import { notFoundErrorViewI18n } from './notFoundErrorView.i18n';

export function NotFoundErrorView() {
	let intl = useIntl(notFoundErrorViewI18n);

	return (
		<Error
			title={intl.translate('title')}
			message={intl.translate('message')}
		/>
	);
}
