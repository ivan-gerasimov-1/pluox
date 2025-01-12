import { Entity } from '@root/core/domain/entity/entity';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';
import type { IProduct } from '@root/core/modules/product/domain/productEntity/types';

export class Product extends Entity implements IProduct {
	constructor(id: Id, createdAt: TISODateString, modifiedAt?: TISODateString) {
		super(id, createdAt, modifiedAt);
	}
}
