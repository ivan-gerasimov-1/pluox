import { EAppPath } from '@root/presentation/web-ui/appPath';

import { CreateVenueScreen } from '@root/presentation/web-ui/modules/venues/createVenue/createVenueScreen';
import { EditVenueScreen } from '@root/presentation/web-ui/modules/venues/editVenue/editVenueScreen';
import { VenueListScreen } from '@root/presentation/web-ui/modules/venues/venueList/venueListScreen';
import { ViewVenueScreen } from '@root/presentation/web-ui/modules/venues/viewVenue/viewVenueScreen';

export const venueRoutes = [
	{
		path: EAppPath.VENUES,
		Component: VenueListScreen,
	},
	{
		path: EAppPath.VENUES_CREATE,
		Component: CreateVenueScreen,
	},
	{
		path: EAppPath.VENUES_VIEW,
		Component: ViewVenueScreen,
	},
	{
		path: EAppPath.VENUES_EDIT,
		Component: EditVenueScreen,
	},
];
