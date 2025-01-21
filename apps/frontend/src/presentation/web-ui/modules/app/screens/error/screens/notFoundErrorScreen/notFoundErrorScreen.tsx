import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';

import { ErrorScreen } from '@root/presentation/web-ui/modules/app/screens/error/error';
import { notFoundErrorScreenI18n } from '@root/presentation/web-ui/modules/app/screens/error/screens/notFoundErrorScreen/notFoundErrorScreen.i18n';

export function NotFoundErrorScreen() {
	let intl = useIntl(notFoundErrorScreenI18n);

	return <ErrorScreen message={intl.translate('pageNotFound')} />;
}
