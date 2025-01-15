import { CustomStorage } from '@root/core/infrastructure/customStorage/customStorage';
import type {
	ICustomCollectionFactory,
	ICustomStorage,
	ICustomStorageFactory,
} from '@root/core/infrastructure/customStorage/types';
import type { IEnvironment } from '@root/core/modules/settings/infrastructure/environment/types';

export class CustomStorageFactory implements ICustomStorageFactory {
	constructor(
		private readonly storage: Storage,
		private readonly customCollectionFactory: ICustomCollectionFactory,
		private readonly environment: IEnvironment,
	) {}

	public create(): ICustomStorage {
		return new CustomStorage(this.storage, this.customCollectionFactory, {
			namespace: this.environment.storageNamespace,
		});
	}
}
