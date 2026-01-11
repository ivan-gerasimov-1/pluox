import type { IMapper } from '@/core/infrastructure/mapper/types';
import type { TProductDTO } from '@/core/modules/product/application/dto/productDTO';
import type { IProduct } from '@/core/modules/product/domain/productEntity/types';

export interface IProductMapper extends IMapper<TProductDTO, IProduct> {}
