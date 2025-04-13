import { Entity } from '@root/core/domain/entity/entity';
import type { IProduct } from '@root/core/modules/product/domain/productEntity/types';

export class Product extends Entity implements IProduct {}
