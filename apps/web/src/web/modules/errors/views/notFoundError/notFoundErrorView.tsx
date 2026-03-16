import { notFoundErrorViewI18n } from '@/web/modules/errors/views/notFoundError/notFoundErrorView.i18n';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';

import { NavButton } from '@/web/components/navButton/navButton';

import { Error } from '@kit/error/error';

export function NotFoundErrorView() {
	let intl = useIntl(notFoundErrorViewI18n);

	return (
		<Error title={intl.translate('title')} message={intl.translate('message')}>
			<NavButton className="mt-4" to="mainPage" wide>
				{intl.translate('mainPageButtonLabel')}
			</NavButton>
		</Error>
	);
}
