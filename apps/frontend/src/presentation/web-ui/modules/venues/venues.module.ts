import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { VenueViewActions } from '@/presentation/web-ui/modules/venues/components/venueActions/venueViewActions';
import { VenueListViewActions } from '@/presentation/web-ui/modules/venues/components/venueListActions/venueListViewActions';
import { VenueView } from '@/presentation/web-ui/modules/venues/views/venue/venueView';
import { VenueCreateView } from '@/presentation/web-ui/modules/venues/views/venueCreate/venueCreateView';
import { VenueListView } from '@/presentation/web-ui/modules/venues/views/venueList/venueListView';

export const venueRoutes: TRouteObject[] = [
	{
		path: EAppPath.VENUES,
		Component: VenueListView,
		handle: {
			Actions: VenueListViewActions,
		},
	},
	{
		path: EAppPath.VENUES_CREATE,
		Component: VenueCreateView,
		handle: {},
	},
	{
		path: EAppPath.VENUES_VIEW,
		Component: VenueView,
		handle: {
			Actions: VenueViewActions,
		},
	},
];
