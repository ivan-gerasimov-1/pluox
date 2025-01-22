import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

/**
 * @todo
 * 1. Handle migration failures
 */
export function runMigrations() {
	let persistedMigrations = JSON.parse(
		window.localStorage.getItem('@savee/migrations') ?? '{}',
	);
	let migrations = registerMigrations({
		_addLocaleToUser_: addLocaleToUser,
	});

	for (let [id, migrationFn] of migrations) {
		if (persistedMigrations[id]?.success) {
			continue;
		}

		migrationFn();

		let migrationDTO = createMigrationDTO({
			id,
			success: true,
		});

		persistedMigrations[migrationDTO.id] = migrationDTO;
	}

	window.localStorage.setItem(
		'@savee/migrations',
		JSON.stringify(persistedMigrations),
	);
}

function registerMigrations(
	migrationFns: Record<string, () => void>,
): Map<string, () => void> {
	let migrations = new Map<string, () => void>();

	for (let [id, migrationFn] of Object.entries(migrationFns)) {
		migrations.set(id, migrationFn);
	}

	return migrations;
}

function createMigrationDTO(createDTO: {
	id: string;
	success: boolean;
	createdAt?: string;
}): {
	id: string;
	success: boolean;
	createdAt: string;
} {
	return {
		id: createDTO.id,
		success: createDTO.success,
		createdAt: createDTO.createdAt ?? new Date().toISOString(),
	};
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
