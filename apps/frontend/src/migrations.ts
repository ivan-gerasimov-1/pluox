import { ECurrency } from '@root/core/modules/currency/domain/types';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { TUserDTO } from '@root/core/modules/identity/application/dto/userDTO';

export function runMigrations() {
	addThaiBahtCurrencyToStoredAppConfig();
	convertUserObjectToUserMap();
}

/**
 * №1. Add THB to stored appConfig
 * @deprecated
 */
export function addThaiBahtCurrencyToStoredAppConfig() {
	let appConfigStorage = resolveService(EServiceToken.APP_CONFIG_DATASOURCE);
	let appConfig = appConfigStorage.read();

	if (!appConfig) {
		return;
	}

	if (appConfig.availabelCurrencies.includes(ECurrency.THB)) {
		return;
	}

	appConfig.availabelCurrencies.push(ECurrency.THB);
	appConfigStorage.update(appConfig);
}

/**
 *  №2. Convert user object to map
 */
export function convertUserObjectToUserMap() {
	let userDataSource = resolveService(EServiceToken.USER_DATASOURCE);
	let user = userDataSource.read();

	if (!user) {
		return;
	}

	if (typeof user.id === 'string') {
		let userId = user.id as string;

		let userMap = {
			[userId]: user as unknown as TUserDTO,
		};

		userDataSource.clear();
		userDataSource.create(userMap);
	}
}
