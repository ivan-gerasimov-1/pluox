import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { venuesActionsI18n } from '@/presentation/web-ui/modules/venues/components/venuesActions/venuesActions.i18n';
import { NavButton } from '@/presentation/web-ui/uiKit/navButton/navButton';

export function VenuesActions() {
	let intl = useIntl(venuesActionsI18n);

	return (
		<NavButton to="venueCreatePage" wide>
			{intl.translate('create')}
		</NavButton>
	);
}
