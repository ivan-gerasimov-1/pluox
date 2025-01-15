import {
	EServiceToken,
	type IModule,
} from '@root/core/infrastructure/serviceContainer/types';

import { VenueQueryService } from '@root/core/modules/venue/application/venueQueryService/venueQueryService';
import { VenueCreateUseCase } from '@root/core/modules/venue/application/venueUseCase/venueCreateUseCase';
import { VenueUseCase } from '@root/core/modules/venue/application/venueUseCase/venueUseCase';
import { venueDataSourceFactory } from '@root/core/modules/venue/infrastructure/venueDataSource/venueDataSourceFactory';
import { VenueMapper } from '@root/core/modules/venue/infrastructure/venueMapper/venueMapper';
import { VenueRepository } from '@root/core/modules/venue/infrastructure/venueRepository/venueRepository';

export const venueModule: IModule = {
	providers: [
		{
			token: EServiceToken.VENUE_REPOSITORY,
			useClass: VenueRepository,
			deps: [EServiceToken.VENUE_DATASOURCE, EServiceToken.VENUE_MAPPER],
		},
		{
			token: EServiceToken.VENUE_DATASOURCE,
			useFactory: venueDataSourceFactory,
			deps: [EServiceToken.DATABASE],
		},
		{
			token: EServiceToken.VENUE_MAPPER,
			useClass: VenueMapper,
		},
		{
			token: EServiceToken.VENUE_QUERY_SERVICE,
			useClass: VenueQueryService,
			deps: [EServiceToken.VENUE_REPOSITORY, EServiceToken.VENUE_MAPPER],
		},
		{
			token: EServiceToken.VENUE_USE_CASE,
			useClass: VenueUseCase,
			deps: [EServiceToken.VENUE_CREATE_USE_CASE],
		},
		{
			token: EServiceToken.VENUE_CREATE_USE_CASE,
			useClass: VenueCreateUseCase,
			deps: [
				EServiceToken.VENUE_REPOSITORY,
				EServiceToken.VENUE_MAPPER,
				EServiceToken.ID_GENERATOR,
				EServiceToken.TEMPORAL,
			],
		},
	],
};
