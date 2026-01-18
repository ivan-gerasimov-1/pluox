import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { VenuesActions } from '@/presentation/web-ui/modules/venues/components/venuesActions/venuesActions';
import { ViewVenueActions } from '@/presentation/web-ui/modules/venues/components/viewVenueActions/viewVenueActions';
import { CreateVenueScreen } from '@/presentation/web-ui/modules/venues/createVenue/createVenueScreen';
import { VenueListScreen } from '@/presentation/web-ui/modules/venues/venueList/venueListScreen';
import { VenueViewScreen } from '@/presentation/web-ui/modules/venues/viewVenue/viewVenueScreen';

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
		handle: {
			Actions: ViewVenueActions,
		},
	},
];
