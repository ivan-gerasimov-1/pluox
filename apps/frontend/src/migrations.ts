import { type TCurrencyRates } from '@root/core/modules/currency/domain/types';

import { ObjectDataSource } from '@root/core/infrastructure/dataSource/objectDataSource';
import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import { STORAGE_NAMESPACE } from '@root/core/modules/settings/infrastructure/environment/constants';

import { CURRENCY_RATE_STORAGE_ID } from '@root/core/modules/currency/infrastructure/currencyRateDataSource/constants';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import { SESSION_STORAGE_ID } from '@root/core/modules/identity/infrastructure/sessionDataSource/constants';
import type { TAppConfig } from '@root/core/modules/settings/domain/appConfig/types';
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
	let appConfigDataSource = new ObjectDataSource<TAppConfig>(
		window.localStorage,
		{
			id: APP_CONFIG_STORAGE_ID,
			namespace: STORAGE_NAMESPACE,
		},
	);

	let sessionDataSource = new ObjectDataSource<TSessionDTO>(
		window.localStorage,
		{
			id: SESSION_STORAGE_ID,
			namespace: STORAGE_NAMESPACE,
		},
	);

	let currencyRateDataSource = new ObjectDataSource<TCurrencyRates>(
		window.localStorage,
		{
			id: CURRENCY_RATE_STORAGE_ID,
			namespace: STORAGE_NAMESPACE,
		},
	);

	let appConfig = appConfigDataSource.findOne();
	let session = sessionDataSource.findOne();
	let currencyRate = currencyRateDataSource.findOne();

	if (
		appConfig &&
		!(
			// @ts-expect-error
			appConfig.data
		)
	) {
		appConfigDataSource.clear();

		resolveService(EServiceToken.APP_CONFIG_DATASOURCE) //
			.insert('data', appConfig);
	}

	if (
		session &&
		!(
			// @ts-expect-error
			session.data
		)
	) {
		sessionDataSource.clear();

		resolveService(EServiceToken.SESSION_DATASOURCE) //
			.insert('data', session);
	}

	if (
		currencyRate &&
		!(
			// @ts-expect-error
			currencyRate.data
		)
	) {
		currencyRateDataSource.clear();

		resolveService(EServiceToken.CURRENCY_RATE_DATASOURCE) //
			.insert('data', currencyRate);
	}
}
