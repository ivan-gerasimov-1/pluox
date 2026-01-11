import { EAppPath } from '@/presentation/web-ui/appPath';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { venuesActionsI18n } from '@/presentation/web-ui/modules/venues/components/venuesActions/venuesActions.i18n';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@/presentation/web-ui/uiKit/button/button';

export function VenuesActions() {
	let intl = useIntl(venuesActionsI18n);

	return (
		<Button size="m" wide asChild>
			<AppLink to={EAppPath.VENUES_CREATE}>{intl.translate('create')}</AppLink>
		</Button>
	);
}
