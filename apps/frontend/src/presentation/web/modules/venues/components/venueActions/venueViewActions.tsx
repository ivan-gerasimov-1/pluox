import { useParams } from 'react-router';

import type { Id } from '@/core/domain/types';

import { INVALID_ID } from '@/presentation/web/constants/invalidId';
import { useAppNavigation } from '@/presentation/web/hooks/useNavigation';
import { useIntl } from '@/presentation/web/modules/intl/useIntl/useIntl';
import { venueViewActionsI18n } from '@/presentation/web/modules/venues/components/venueActions/venueViewActions.i18n';
import {
	useVenueArchiveMutation,
	useVenueOneByIdQuery,
	useVenueRemoveMutation,
	useVenueUnarchiveMutation,
} from '@/presentation/web/modules/venues/queries/venues.query';
import { Button } from '@/presentation/web/uiKit/button/button';
import { Icon } from '@/presentation/web/uiKit/icon/icon';
import { EIconName } from '@/presentation/web/uiKit/icon/icons';
import { Stack } from '@/presentation/web/uiKit/layout/layout';

export function VenueViewActions() {
	let { id = INVALID_ID } = useParams<{ id: Id }>();
	let intl = useIntl(venueViewActionsI18n);
	let navigation = useAppNavigation();

	let venue = useVenueOneByIdQuery(id);

	let venueArchiveMutation = useVenueArchiveMutation();
	let venueUnarchiveMutation = useVenueUnarchiveMutation();

	let venueRemoveMutation = useVenueRemoveMutation({
		onSuccess: () => {
			navigation.venueListPage();
		},
	});

	if (!venue) {
		return null;
	}

	return (
		<Stack row>
			<Button
				onClick={() => {
					if (venue.isArchived) {
						venueUnarchiveMutation.mutate(venue.id);
					} else {
						venueArchiveMutation.mutate(venue.id);
					}
				}}
				wide
			>
				{venue.isArchived
					? intl.translate('unarchive')
					: intl.translate('archive')}
			</Button>

			<Button
				onClick={() => venueRemoveMutation.mutate(venue.id)}
				intent="danger"
			>
				<Icon name={EIconName.Trash} />
			</Button>
		</Stack>
	);
}
