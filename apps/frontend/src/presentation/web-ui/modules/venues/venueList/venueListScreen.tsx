import { EAppPath } from '@root/presentation/web-ui/appPath';
import { useVenueListQuery } from '@root/presentation/web-ui/modules/venues/venues.query';

import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function VenueListScreen() {
	let venueList = useVenueListQuery();

	return (
		<Screen>
			<Header title="Venues" />

			<AppLink to={EAppPath.VENUES_CREATE}>Create</AppLink>

			<ul>
				{venueList.map((venue) => (
					<li key={venue.id}>
						<AppLink to={EAppPath.VENUES_EDIT.replace(':id', venue.id)}>
							{venue.name}
						</AppLink>
					</li>
				))}
			</ul>
		</Screen>
	);
}
