import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { venuesActionsI18n } from '@/presentation/web-ui/modules/venues/components/venuesActions/venuesActions.i18n';
import { Button } from '@/presentation/web-ui/uiKit/button/button';

export function VenuesActions() {
	let intl = useIntl(venuesActionsI18n);
	let navigate = useAppNavigation();

	return (
		<Button onClick={navigate.venueCreatePage} wide>
			{intl.translate('create')}
		</Button>
	);
}
