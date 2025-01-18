import {
	ECurrency,
	type TCurrencyRates,
} from '@root/core/modules/currency/domain/types';

import { ObjectDataSource } from '@root/core/infrastructure/dataSource/objectDataSource';
import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import { STORAGE_NAMESPACE } from '@root/core/modules/settings/infrastructure/environment/constants';

import type { Id } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';

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
	addThaiBahtCurrencyToStoredAppConfig();
	convertUserObjectToUserMap();
	moveClientIdToSession();
	moveAuthTokenToSession();
	migrateExpenseInStorageToNewFormatAndStorageId();
	addUserIdToExpense();
	renameCommentOfExpenseDTOToDescription();
	addVenueIdToExpense();
	addUserIdToCategories();
	migrateObjectToDataField();
}

/**
 * №1. Add THB to stored appConfig
 * @deprecated
 */
export function addThaiBahtCurrencyToStoredAppConfig(): void {
	let appConfigStorage = resolveService(EServiceToken.APP_CONFIG_DATASOURCE);
	let appConfig = appConfigStorage.findOne({
		id: 'data',
	});

	if (!appConfig) {
		return;
	}

	if (appConfig.availabelCurrencies.includes(ECurrency.THB)) {
		return;
	}

	appConfig.availabelCurrencies.push(ECurrency.THB);
	appConfigStorage.update('data', appConfig);
}

/**
 * №2. Convert user object to map
 */
export function convertUserObjectToUserMap(): void {
	let userObjectDataSource = new ObjectDataSource<TUserDTO>(
		window.localStorage,
		{
			id: 'user',
			namespace: STORAGE_NAMESPACE,
		},
	);
	let userCollectionDataSource = resolveService(EServiceToken.USER_DATASOURCE);

	let user = userObjectDataSource.findOne();

	if (!user) {
		return;
	}

	if (typeof user.id === 'string') {
		userCollectionDataSource.insert(user.id, user);
		userObjectDataSource.clear();
	}
}

/**
 * №3. Move ClientId to Session
 *
 * @description
 * This scenario is only possible when clientId exists in localStorage, but
 * user data was not saved in LocalStorage. In this case, we need to move
 * the clientId to the session and create an empty user
 */
function moveClientIdToSession(): void {
	const CLIENT_ID_STORAGE_ID = 'clientId';

	let clientIdDataSource = new ObjectDataSource<Id>(window.localStorage, {
		id: CLIENT_ID_STORAGE_ID,
		namespace: STORAGE_NAMESPACE,
	});

	let sessionDataSource = resolveService(EServiceToken.SESSION_DATASOURCE);
	let userService = resolveService(EServiceToken.USER_SERVICE);

	let clientId = clientIdDataSource.findOne();

	if (!clientId) {
		return;
	}

	if (sessionDataSource.findOne() === null) {
		let user = userService.createUser({
			email: '',
			name: '',
		});

		sessionDataSource.insert('data', {
			clientId,
			userId: user.id,
			authToken: null,
		});
	} else {
		sessionDataSource.update('data', {
			clientId,
		});
	}

	clientIdDataSource.clear();
}

/**
 * №4. Move authToken to Session
 * @deprecated
 */
function moveAuthTokenToSession(): void {
	// let authDataSource = new LocalStorageDataSource<string>('token');
	// let sessionDataSource = resolveService(EServiceToken.SESSION_DATASOURCE);
	// if (!sessionDataSource.isEmpty()) {
	// 	let authToken = authDataSource.read();
	// 	sessionDataSource.update({
	// 		authToken,
	// 	});
	// }
	// authDataSource.clear();
}

/**
 * №5. Migrate expenses to new format and storage id
 */
export function migrateExpenseInStorageToNewFormatAndStorageId(): void {
	const OLD_EXPENSES_STORAGE_ID = 'store/$expenses';

	let oldExpenseDataSource = new ObjectDataSource<{
		state: {
			operations: Record<string, TExpenseDTO>;
		};
	}>(window.localStorage, {
		id: OLD_EXPENSES_STORAGE_ID,
		namespace: STORAGE_NAMESPACE,
	});
	let expenseDataSource = resolveService(EServiceToken.EXPENSE_DATASOURCE);

	let expenses = oldExpenseDataSource.findOne();

	if (!expenses) {
		return;
	}

	for (let expense of Object.values(expenses.state.operations)) {
		expenseDataSource.insert(expense.id, expense);
	}

	oldExpenseDataSource.clear();
}

/**
 * №6. Add userId to expenses
 */
export function addUserIdToExpense(): void {
	let expenseDataSource = resolveService(EServiceToken.EXPENSE_DATASOURCE);
	let sessionDataSource = resolveService(EServiceToken.SESSION_DATASOURCE);

	let sessionDTO = sessionDataSource.findOne({
		id: 'data',
	});
	let expenses = expenseDataSource.findMany();

	if (!sessionDTO || !expenses) {
		return;
	}

	for (let expense of expenses.items) {
		expense.userId = sessionDTO.userId;

		expenseDataSource.update(expense.id, expense);
	}
}

/**
 * №7. Rename comment of ExpenseDTO to description
 */
export function renameCommentOfExpenseDTOToDescription(): void {
	let expenseDataSource = resolveService(EServiceToken.EXPENSE_DATASOURCE);

	let expenses = expenseDataSource.findMany();

	if (!expenses) {
		return;
	}

	for (let expense of expenses.items) {
		if (expense.description !== undefined) {
			continue;
		}

		expense.description =
			// @ts-expect-error
			expense.comment ?? '';

		Reflect.deleteProperty(expense, 'comment');

		expenseDataSource.insert(expense.id, expense, {
			replace: true,
		});
	}
}

/**
 * №8. Add venueId to expense
 */
export function addVenueIdToExpense(): void {
	let expenseDataSource = resolveService(EServiceToken.EXPENSE_DATASOURCE);

	let expenses = expenseDataSource.findMany();

	if (!expenses) {
		return;
	}

	for (let expense of expenses.items) {
		if (expense.venue || expense.venue === null) {
			continue;
		}

		expense.venue = null;
		expenseDataSource.insert(expense.id, expense, {
			replace: true,
		});
	}
}

/**
 * №9. Add userId to categories
 */
export function addUserIdToCategories(): void {
	let categoryDataSource = resolveService(EServiceToken.CATEGORY_DATASOURCE);
	let sessionDataSource = resolveService(EServiceToken.SESSION_DATASOURCE);

	let sessionDTO = sessionDataSource.findOne({
		id: 'data',
	});
	let categories = categoryDataSource.findMany();

	if (!sessionDTO || categories.total === 0) {
		return;
	}

	for (let category of categories.items) {
		category.userId = sessionDTO.userId;

		categoryDataSource.update(category.id, category);
	}
}

/**
 * №10. Migrate object storage to data field
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
