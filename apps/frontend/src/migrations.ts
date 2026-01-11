import { resolveService } from '@/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@/core/infrastructure/serviceContainer/types';
import { ELocaleCode } from '@/core/modules/intl/domain/enums';

type TMigrationDTO = {
	id: string;
	success: boolean;
	createdAt: string;
};

type TMigrationCreateDTO = {
	id: string;
	success: boolean;
	createdAt?: string;
};

type TMigrations = Record<string, TMigrationDTO>;

/**
 * @todo
 * 1. Handle migration failures
 */
export function runMigrations() {
	let persistedMigrations = readMigrationsFromStorage();
	let migrations = registerMigrations({
		_moveSaveeDataToPluox_: moveSaveeDataToPluox,
		_removeSaveeMigrations_: removeSaveeMigrations,
		_addLocaleToUser_: addLocaleToUser,
		_addIsArchivedFieldToVenues: addIsArchivedFieldToVenues,
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

	saveMigrationsToStorage(persistedMigrations);
}

function readMigrationsFromStorage(): TMigrations {
	return JSON.parse(window.localStorage.getItem('@pluox/migrations') ?? '{}');
}

function saveMigrationsToStorage(migrations: TMigrations) {
	window.localStorage.setItem('@pluox/migrations', JSON.stringify(migrations));
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

function createMigrationDTO(createDTO: TMigrationCreateDTO): TMigrationDTO {
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

export function removeSaveeMigrations(): void {
	window.localStorage.removeItem('@savee/migrations');
}

export function addIsArchivedFieldToVenues() {
	const venueDataSource = resolveService(EServiceToken.VENUE_DATASOURCE);

	const venues = venueDataSource.findAll();

	if (!venues) {
		return;
	}

	for (let venue of venues) {
		if (venue.isArchived !== undefined) {
			continue;
		}

		venueDataSource.update(venue.id, {
			isArchived: false,
		});
	}
}

export function moveSaveeDataToPluox(): void {
	const PREV_NAMESPACE_NAME = '@savee';
	const NEXT_NAMESPACE_NAME = '@pluox';

	let storageKeys: string[] = [];

	// eslint-disable-next-line no-plusplus
	for (let idx = 0; idx < window.localStorage.length; idx++) {
		let storageKey = window.localStorage.key(idx);

		if (storageKey === null) {
			break;
		}

		if (
			storageKey.includes(NEXT_NAMESPACE_NAME) ||
			!storageKey.includes(PREV_NAMESPACE_NAME)
		) {
			continue;
		}

		storageKeys.push(storageKey);
	}

	for (let storageKey of storageKeys) {
		let storageValue = window.localStorage.getItem(storageKey);

		if (storageValue === null) {
			continue;
		}

		let newStorageKey = storageKey.replace(
			PREV_NAMESPACE_NAME,
			NEXT_NAMESPACE_NAME,
		);

		window.localStorage.setItem(newStorageKey, storageValue);
		window.localStorage.removeItem(storageKey);
	}
}
