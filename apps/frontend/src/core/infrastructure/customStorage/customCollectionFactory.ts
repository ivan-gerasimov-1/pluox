import { CustomCollection } from '@root/core/infrastructure/customStorage/customCollection';
import type {
	ICustomCollectionFactory,
	ICustomCollection,
} from '@root/core/infrastructure/customStorage/types';

export class CustomCollectionFactory implements ICustomCollectionFactory {
	public create(
		storage: Storage,
		options: {
			id: string;
		},
	): ICustomCollection {
		return new CustomCollection(storage, {
			id: options.id,
		});
	}
}
