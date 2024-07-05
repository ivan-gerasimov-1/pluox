import { useIntl } from '@modules/intl/useIntl/useIntl';

import { ErrorScreen } from '@screens/error/error';
import { notFoundErrorScreenI18n } from '@screens/error/screens/notFoundErrorScreen/notFoundErrorScreen.i18n';

export function NotFoundErrorScreen() {
	let intl = useIntl(notFoundErrorScreenI18n);

	return <ErrorScreen message={intl.translate('pageNotFound')} />;
}
