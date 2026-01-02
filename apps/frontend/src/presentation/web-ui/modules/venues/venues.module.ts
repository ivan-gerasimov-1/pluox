import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

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
			title: {
				[ELocaleCode.EN_US]: 'Venues',
				[ELocaleCode.RU_RU]: 'Места',
			},
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.VENUES_CREATE,
		Component: CreateVenueScreen,
		handle: {
			title: {
				[ELocaleCode.EN_US]: 'New venue',
				[ELocaleCode.RU_RU]: 'Новое место',
			},
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.VENUES_VIEW,
		Component: VenueViewScreen,
		handle: {
			title: {
				[ELocaleCode.EN_US]: 'Venue',
				[ELocaleCode.RU_RU]: 'Место',
			},
			hasNavbar: true,
		},
	},
];
