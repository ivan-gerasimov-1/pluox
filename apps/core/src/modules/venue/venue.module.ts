import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { VenueQueryService } from '@pluox/core/src/modules/venue/application/venueQueryService/venueQueryService';
import { VenueArchiveUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/venueArchiveUseCase';
import { VenueCreateUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/venueCreateUseCase';
import { VenueDeleteUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/venueDeleteUseCase';
import { VenueUnarchiveUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/venueUnarchiveUseCase';
import { VenueUpdateUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/venueUpdateUseCase';
import { VenueUseCase } from '@pluox/core/src/modules/venue/application/venueUseCase/venueUseCase';
import { venueDataSourceFactory } from '@pluox/core/src/modules/venue/infrastructure/venueDataSource/venueDataSourceFactory';
import { VenueMapper } from '@pluox/core/src/modules/venue/infrastructure/venueMapper/venueMapper';
import { VenueRepository } from '@pluox/core/src/modules/venue/infrastructure/venueRepository/venueRepository';

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
			deps: [
				EServiceToken.VENUE_CREATE_USE_CASE,
				EServiceToken.VENUE_UPDATE_USE_CASE,
				EServiceToken.VENUE_DELETE_USE_CASE,
				EServiceToken.VENUE_ARCHIVE_USE_CASE,
				EServiceToken.VENUE_UNARCHIVE_USE_CASE,
			],
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
		{
			token: EServiceToken.VENUE_UPDATE_USE_CASE,
			useClass: VenueUpdateUseCase,
			deps: [EServiceToken.VENUE_REPOSITORY, EServiceToken.VENUE_MAPPER],
		},
		{
			token: EServiceToken.VENUE_DELETE_USE_CASE,
			useClass: VenueDeleteUseCase,
			deps: [EServiceToken.VENUE_REPOSITORY],
		},
		{
			token: EServiceToken.VENUE_ARCHIVE_USE_CASE,
			useClass: VenueArchiveUseCase,
			deps: [EServiceToken.VENUE_REPOSITORY],
		},
		{
			token: EServiceToken.VENUE_UNARCHIVE_USE_CASE,
			useClass: VenueUnarchiveUseCase,
			deps: [EServiceToken.VENUE_REPOSITORY],
		},
	],
};
