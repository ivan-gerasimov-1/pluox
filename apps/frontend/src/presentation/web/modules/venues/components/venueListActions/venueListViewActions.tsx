import { useIntl } from '@/presentation/web/modules/intl/useIntl/useIntl';
import { venueListViewActionsI18n } from '@/presentation/web/modules/venues/components/venueListActions/venueListViewActions.i18n';
import { NavButton } from '@/presentation/web/uiKit/navButton/navButton';

export function VenueListViewActions() {
	let intl = useIntl(venueListViewActionsI18n);

	return (
		<NavButton to="venueCreatePage" wide>
			{intl.translate('create')}
		</NavButton>
	);
}
