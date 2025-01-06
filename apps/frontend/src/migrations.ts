import { ECurrency } from '@root/core/modules/currency/domain/types';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';
import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { Id } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export function runMigrations() {
	addThaiBahtCurrencyToStoredAppConfig();
	convertUserObjectToUserMap();
	moveClientIdToSession();
	moveAuthTokenToSession();
	migrateExpenseInStorageToNewFormatAndStorageId();
	addUserIdToExpense();
}

/**
 * №1. Add THB to stored appConfig
 * @deprecated
 */
export function addThaiBahtCurrencyToStoredAppConfig(): void {
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
 * №2. Convert user object to map
 */
export function convertUserObjectToUserMap(): void {
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

	let clientIdDataSource = new LocalStorageDataSource<Id>(CLIENT_ID_STORAGE_ID);

	let sessionDataSource = resolveService(EServiceToken.SESSION_DATASOURCE);
	let userService = resolveService(EServiceToken.USER_SERVICE);

	let clientId = clientIdDataSource.read();

	if (!clientId) {
		return;
	}

	if (sessionDataSource.isEmpty()) {
		let user = userService.createUser({
			email: '',
			name: '',
		});

		sessionDataSource.create({
			clientId,
			userId: user.id,
			authToken: null,
		});
	} else {
		sessionDataSource.update({
			clientId,
		});
	}

	clientIdDataSource.clear();
}

/**
 * №4. Move authToken to Session
 */
function moveAuthTokenToSession(): void {
	let authDataSource = new LocalStorageDataSource<string>('token');
	let sessionDataSource = resolveService(EServiceToken.SESSION_DATASOURCE);

	if (!sessionDataSource.isEmpty()) {
		let authToken = authDataSource.read();

		sessionDataSource.update({
			authToken,
		});
	}

	authDataSource.clear();
}

/**
 * №5. Migrate expenses to new format and storage id
 */
export function migrateExpenseInStorageToNewFormatAndStorageId(): void {
	const OLD_EXPENSES_STORAGE_ID = 'store/$expenses';

	let oldExpenseDataSource = new LocalStorageDataSource<{
		state: {
			operations: Record<string, TExpenseDTO>;
		};
	}>(OLD_EXPENSES_STORAGE_ID);
	let expenseDataSource = resolveService(EServiceToken.EXPENSE_DATASOURCE);

	let expenses = oldExpenseDataSource.read();

	if (!expenses) {
		return;
	}

	expenseDataSource.create(expenses?.state.operations);

	oldExpenseDataSource.clear();
}

/**
 * №6. Add userId to expenses
 */
export function addUserIdToExpense(): void {
	let expenseDataSource = resolveService(EServiceToken.EXPENSE_DATASOURCE);
	let sessionDataSource = resolveService(EServiceToken.SESSION_DATASOURCE);

	let sessionDTO = sessionDataSource.read();
	let expenses = expenseDataSource.read();

	if (!sessionDTO || !expenses) {
		return;
	}

	for (let expense of Object.values(expenses)) {
		expense.userId = sessionDTO.userId;
	}

	expenseDataSource.update(expenses);
}
