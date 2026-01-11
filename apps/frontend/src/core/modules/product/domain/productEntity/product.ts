import { Entity } from '@/core/domain/entity/entity';
import type { IProduct } from '@/core/modules/product/domain/productEntity/types';

export class Product extends Entity implements IProduct {}
