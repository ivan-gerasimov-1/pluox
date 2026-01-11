import { EAppPath } from '@/presentation/web-ui/appPath';
import { notFoundErrorI18n } from '@/presentation/web-ui/modules/errors/screens/notFoundError/notFoundError.i18n';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import { Error } from '@/presentation/web-ui/uiKit/error/error';

export function NotFoundError() {
	let intl = useIntl(notFoundErrorI18n);

	return (
		<Error title={intl.translate('title')} message={intl.translate('message')}>
			<Button className="mt-4" wide asChild>
				<AppLink to={EAppPath.DASHBOARD}>
					{intl.translate('mainPageButtonLabel')}
				</AppLink>
			</Button>
		</Error>
	);
}
