import { ESource } from './types';

type TMigration = {
	id: string;
	status: 'success' | 'error';
};

export async function runMigrations() {
	let storedMigrations = await getStoredMigrations();
	let migrations = createMigrations();

	for (let [id, migrationFn] of migrations) {
		if (storedMigrations[id] && storedMigrations[id].status === 'success') {
			continue;
		}

		// eslint-disable-next-line no-await-in-loop
		let result = await migrationFn();

		storedMigrations[id] = {
			id,
			status: result.status,
		};
	}

	localStorage.setItem('migrations', JSON.stringify(storedMigrations));
}

function createMigrations() {
	let migrations = new Map();

	migrations
		.set('renameFeedsToSources', renameFeedsToSources)
		.set('addTypeToSources', addTypeToSources);

	return migrations;
}

async function getOrCreateStoredMigrations(): Promise<
	Record<string, TMigration>
> {
	const MIGRATIONS_STORAGE_ID = 'migrations';

	let rawStorage = localStorage.getItem(MIGRATIONS_STORAGE_ID) ?? '{}';
	let storage = {};

	try {
		storage = JSON.parse(rawStorage);
	} catch {
		localStorage.setItem(MIGRATIONS_STORAGE_ID, JSON.stringify(storage));
	}

	return storage;
}

async function getStoredMigrations() {
	return getOrCreateStoredMigrations();
}

async function renameFeedsToSources() {
	let rawPrevSources = localStorage.getItem('feeds');

	if (!rawPrevSources) {
		return {
			status: 'success',
		};
	}

	localStorage.setItem('sources', rawPrevSources);
	localStorage.removeItem('feeds');

	return {
		status: 'success',
	};
}

async function addTypeToSources() {
	let rawPrevSources = localStorage.getItem('sources');
	let prevSources = [];
	let nextSources = [];

	if (!rawPrevSources) {
		return {
			status: 'success',
		};
	}

	try {
		prevSources = JSON.parse(rawPrevSources);
	} catch {
		/* empty */
	}

	for (let source of prevSources) {
		nextSources.push({
			...source,
			type: ESource.FEED,
		});
	}

	localStorage.setItem('sources', JSON.stringify(nextSources));

	return {
		status: 'success',
	};
}
