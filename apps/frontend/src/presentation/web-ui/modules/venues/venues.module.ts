import { EAppPath } from '@root/presentation/web-ui/appPath';
import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { CreateVenueScreen } from '@root/presentation/web-ui/modules/venues/createVenue/createVenueScreen';
import { VenueListScreen } from '@root/presentation/web-ui/modules/venues/venueList/venueListScreen';
import { VenueViewScreen } from '@root/presentation/web-ui/modules/venues/viewVenue/viewVenueScreen';

export const venueRoutes: TRouteObject[] = [
	{
		path: EAppPath.VENUES,
		Component: VenueListScreen,
		handle: {
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.VENUES_CREATE,
		Component: CreateVenueScreen,
		handle: {
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.VENUES_VIEW,
		Component: VenueViewScreen,
		handle: {
			hasNavbar: true,
		},
	},
];
