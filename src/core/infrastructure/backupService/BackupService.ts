import type { IBackupService } from '@core/infrastructure/backupService/types';
import { ClientId } from '@core/infrastructure/clientId/ClientId';
import type { IClientId } from '@core/infrastructure/clientId/types';
import {
	DatabaseClient,
	type IDatabaseClient,
} from '@core/infrastructure/databaseClient/DatabaseClient';

export class BackupService implements IBackupService {
	static #instance: IBackupService;

	private constructor(
		private readonly databaseClient: IDatabaseClient,
		private readonly clientId: IClientId,
	) {}

	public static getInstance(): IBackupService {
		if (!this.#instance) {
			let databaseClient = DatabaseClient.getInstance();
			let clientId = ClientId.getInstance();

			this.#instance = new BackupService(databaseClient, clientId);
		}

		return this.#instance;
	}

	public run(): Promise<void> {
		return Promise.resolve();
	}
}
