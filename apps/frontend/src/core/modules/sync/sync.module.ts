import {
	type IModule,
	EServiceToken,
} from '@root/core/infrastructure/serviceContainer/types';

import { SyncService } from '@root/core/modules/sync/application/syncService/syncService';

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
