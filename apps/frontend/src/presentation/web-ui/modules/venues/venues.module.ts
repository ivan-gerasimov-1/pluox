import { EAppPath } from '@root/presentation/web-ui/appPath';
import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { VenuesActions } from '@root/presentation/web-ui/modules/venues/components/venuesActions/venuesActions';
import { CreateVenueScreen } from '@root/presentation/web-ui/modules/venues/createVenue/createVenueScreen';
import { VenueListScreen } from '@root/presentation/web-ui/modules/venues/venueList/venueListScreen';
import { VenueViewScreen } from '@root/presentation/web-ui/modules/venues/viewVenue/viewVenueScreen';

export const venueRoutes: TRouteObject[] = [
	{
		path: EAppPath.VENUES,
		Component: VenueListScreen,
		handle: {
			Actions: VenuesActions,
		},
	},
	{
		path: EAppPath.VENUES_CREATE,
		Component: CreateVenueScreen,
		handle: {},
	},
	{
		path: EAppPath.VENUES_VIEW,
		Component: VenueViewScreen,
		handle: {},
	},
];
