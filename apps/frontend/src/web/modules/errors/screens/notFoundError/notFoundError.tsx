import { notFoundErrorI18n } from '@/web/modules/errors/screens/notFoundError/notFoundError.i18n';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';

import { NavButton } from '@/web/components/navButton/navButton';

import { Error } from '@kit/error/error';

export function NotFoundError() {
	let intl = useIntl(notFoundErrorI18n);

	return (
		<Error title={intl.translate('title')} message={intl.translate('message')}>
			<NavButton className="mt-4" to="mainPage" wide>
				{intl.translate('mainPageButtonLabel')}
			</NavButton>
		</Error>
	);
}
