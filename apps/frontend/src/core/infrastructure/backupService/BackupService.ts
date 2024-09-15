import type { IBackupService } from '@core/infrastructure/backupService/types';
import { ClientId } from '@core/infrastructure/clientId/ClientId';
import type { IClientId } from '@core/infrastructure/clientId/types';
import { DatabaseClient } from '@core/infrastructure/databaseClient/DatabaseClient';
import type { IDatabaseClient } from '@core/infrastructure/databaseClient/types';
import { UserStorage } from '@core/infrastructure/userStorage/UserStorage';
import type { IUserStorage } from '@core/infrastructure/userStorage/types';

export class BackupService implements IBackupService {
	static #instance: IBackupService;

	private readonly TABLE_NAME: string = 'backups';

	private constructor(
		private readonly databaseClient: IDatabaseClient,
		private readonly clientId: IClientId,
		private readonly userStorage: IUserStorage,
	) {}

	public static getInstance(): IBackupService {
		if (!this.#instance) {
			let databaseClient = DatabaseClient.getInstance();
			let clientId = ClientId.getInstance();
			let userStorage = UserStorage.getInstance();

			this.#instance = new BackupService(databaseClient, clientId, userStorage);
		}

		return this.#instance;
	}

	public async run<T>(payload: T): Promise<void> {
		let clientId = this.userStorage.get()?.id || this.clientId.get();

		await this.databaseClient.add(this.TABLE_NAME, {
			clientId,
			updatedAt: new Date().toISOString(),
			value: payload,
		});

		return Promise.resolve();
	}
}
