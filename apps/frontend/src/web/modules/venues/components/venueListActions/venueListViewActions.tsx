import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { venueListViewActionsI18n } from '@/web/modules/venues/components/venueListActions/venueListViewActions.i18n';

import { NavButton } from '@kit/navButton/navButton';

export function VenueListViewActions() {
	let intl = useIntl(venueListViewActionsI18n);

	return (
		<NavButton to="venueCreatePage" wide>
			{intl.translate('create')}
		</NavButton>
	);
}
