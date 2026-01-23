import { EAppPath } from '@/presentation/web/appPath';
import type { TRouteObject } from '@/presentation/web/hooks/useScreenMeta/types';
import { VenueViewActions } from '@/presentation/web/modules/venues/components/venueActions/venueViewActions';
import { VenueListViewActions } from '@/presentation/web/modules/venues/components/venueListActions/venueListViewActions';
import { VenueView } from '@/presentation/web/modules/venues/views/venue/venueView';
import { VenueCreateView } from '@/presentation/web/modules/venues/views/venueCreate/venueCreateView';
import { VenueListView } from '@/presentation/web/modules/venues/views/venueList/venueListView';

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
