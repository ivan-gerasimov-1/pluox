import { CustomCollection } from '@root/core/infrastructure/customStorage/customCollection';

export class CustomCollectionFactory {
	public create(
		storage: Storage,
		options: {
			id: string;
		},
	): CustomCollection {
		return new CustomCollection(storage, {
			id: options.id,
		});
	}
}
