import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

/**
 * @todo
 * 1. Add list of applied migrations and skip them on sequential run
 */
export function runMigrations() {
	addLocaleToUser();
}

export function addLocaleToUser(): void {
	let userDataSource = resolveService(EServiceToken.USER_DATASOURCE);

	let users = userDataSource.findAll();

	if (!users) {
		return;
	}

	for (let user of users) {
		if (user.locale) {
			continue;
		}

		userDataSource.update(user.id, {
			locale: ELocaleCode.RU_RU,
		});
	}
}
