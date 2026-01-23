import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { SyncService } from '@pluox/core/src/modules/sync/application/syncService/syncService';

export const syncModule: IModule = {
	providers: [
		{
			token: EServiceToken.SYNC_SERVICE,
			useClass: SyncService,
			deps: [
				EServiceToken.EXPENSE_API,
				EServiceToken.EXPENSE_REPOSITORY,
				EServiceToken.EXPENSE_MAPPER,
			],
		},
	],
};
