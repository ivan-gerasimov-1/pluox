import { EAppPath } from '@root/presentation/web-ui/appPath';

import { CreateVenueScreen } from '@root/presentation/web-ui/modules/venues/createVenue/createVenueScreen';
import { EditVenueScreen } from '@root/presentation/web-ui/modules/venues/editVenue/editVenueScreen';
import { VenueListScreen } from '@root/presentation/web-ui/modules/venues/venueList/venueListScreen';
import { VenueViewScreen } from '@root/presentation/web-ui/modules/venues/viewVenue/viewVenueScreen';

export const venueRoutes = [
	{
		path: EAppPath.VENUES,
		Component: VenueListScreen,
		handle: {
			title: 'Venues',
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.VENUES_CREATE,
		Component: CreateVenueScreen,
		handle: {
			title: 'Create Venue',
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.VENUES_VIEW,
		Component: VenueViewScreen,
		handle: {
			title: 'Venue',
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.VENUES_EDIT,
		Component: EditVenueScreen,
		handle: {
			title: 'Edit Venue',
			hasNavbar: true,
		},
	},
];
