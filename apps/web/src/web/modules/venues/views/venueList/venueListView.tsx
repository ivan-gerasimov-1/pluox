import { venueListViewI18n } from './venueListView.i18n';

import { EAppPath } from '@/web/appPath';

import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import {
	useVenueListArchivedQuery,
	useVenueListUnarchivedQuery,
} from '@/web/modules/venues/queries/venues.query';

import { NavLink } from '@/web/components/navLink/navLink';

import { Badge } from '@kit/badge/badge';
import { Stack } from '@kit/layout/layout';
import { ListIcon } from '@kit/list/list';
import { Sheet } from '@kit/sheet/sheet';
import {
	ValueAction,
	ValueActionLeading,
	ValueActionTrailing,
} from '@kit/valueAction/valueAction';

export function VenueListView() {
	let intl = useIntl(venueListViewI18n);
	let venueList = useVenueListUnarchivedQuery();
	let venueListArchived = useVenueListArchivedQuery();

	return (
		<Stack>
			{venueList.map((venue) => (
				<Sheet key={venue.id} interactive asChild>
					<NavLink to={EAppPath.VENUES_VIEW.replace(':id', venue.id)}>
						<Stack row>
							<ListIcon>{venue.name?.[0]}</ListIcon>

							<ValueAction>
								<ValueActionLeading label={venue.name}>
									{venue.categoryName}
								</ValueActionLeading>
							</ValueAction>
						</Stack>
					</NavLink>
				</Sheet>
			))}

			{venueListArchived.map((venue) => (
				<Sheet key={venue.id} interactive asChild>
					<NavLink to={EAppPath.VENUES_VIEW.replace(':id', venue.id)}>
						<Stack row>
							<ListIcon>{venue.name?.[0]}</ListIcon>

							<ValueAction>
								<ValueActionLeading label={venue.name}>
									{venue.categoryName}
								</ValueActionLeading>

								<ValueActionTrailing>
									<Badge>{intl.translate('archived')}</Badge>
								</ValueActionTrailing>
							</ValueAction>
						</Stack>
					</NavLink>
				</Sheet>
			))}
		</Stack>
	);
}
