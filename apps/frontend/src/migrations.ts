import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import { STORAGE_NAMESPACE } from '@root/core/modules/settings/infrastructure/environment/constants';

import { CURRENCY_RATE_STORAGE_ID } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/constants';
import { SESSION_STORAGE_ID } from '@root/core/modules/identity/infrastructure/sessionDataSource/constants';
import { APP_CONFIG_STORAGE_ID } from '@root/core/modules/settings/infrastructure/appConfigDataSource/constants';

/**
 * @todo
 * 1. Add list of applied migrations and skip them on sequential run
 */
export function runMigrations() {
	migrateObjectToDataField();
}

/**
 * №1. Migrate object storage to data field
 */
export function migrateObjectToDataField(): void {
	let appConfig = JSON.parse(
		localStorage.getItem(`${STORAGE_NAMESPACE}/${APP_CONFIG_STORAGE_ID}`) ??
			'null',
	);
	let session = JSON.parse(
		localStorage.getItem(`${STORAGE_NAMESPACE}/${SESSION_STORAGE_ID}`) ??
			'null',
	);
	let currencyRate = JSON.parse(
		localStorage.getItem(`${STORAGE_NAMESPACE}/${CURRENCY_RATE_STORAGE_ID}`) ??
			'null',
	);

	console.log({ appConfig, session, currencyRate });

	if (appConfig && !appConfig.data) {
		localStorage.removeItem(`${STORAGE_NAMESPACE}/${APP_CONFIG_STORAGE_ID}`);

		resolveService(EServiceToken.APP_CONFIG_DATASOURCE) //
			.insert('data', appConfig);
	}

	if (session && !session.data) {
		localStorage.removeItem(`${STORAGE_NAMESPACE}/${SESSION_STORAGE_ID}`);

		resolveService(EServiceToken.SESSION_DATASOURCE) //
			.insert('data', session);
	}

	if (currencyRate && !currencyRate.data) {
		localStorage.removeItem(`${STORAGE_NAMESPACE}/${CURRENCY_RATE_STORAGE_ID}`);

		resolveService(EServiceToken.CURRENCY_RATE_DATASOURCE) //
			.insert('data', currencyRate);
	}
}
