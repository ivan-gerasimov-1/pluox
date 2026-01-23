import {
	addIsArchivedFieldToVenues,
	addLocaleToUser,
	createMigrationDTO,
	moveSaveeDataToPluox,
	readMigrationsFromStorage,
	registerMigrations,
	removeSaveeMigrations,
	saveMigrationsToStorage,
} from '@/migrations/migrations';

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
