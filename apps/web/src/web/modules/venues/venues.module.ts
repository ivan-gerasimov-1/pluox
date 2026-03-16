import { EAppPath } from '@/web/appPath';

import type { TRouteObject } from '@/web/hooks/useRouteMeta/types';

import { VenueViewActions } from '@/web/modules/venues/components/venueActions/venueViewActions';
import { VenueListViewActions } from '@/web/modules/venues/components/venueListActions/venueListViewActions';
import { VenueView } from '@/web/modules/venues/views/venue/venueView';
import { VenueCreateView } from '@/web/modules/venues/views/venueCreate/venueCreateView';
import { VenueListView } from '@/web/modules/venues/views/venueList/venueListView';

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
