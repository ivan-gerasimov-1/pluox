import { Entity } from '@pluox/core/src/domain/entity/entity';

import type { IProduct } from '@pluox/core/src/modules/product/domain/productEntity/types';

export class Product extends Entity implements IProduct {}
