import type { IMapper } from '@root/core/infrastructure/mapper/types';
import type { TProductDTO } from '@root/core/modules/product/application/dto/productDTO';
import type { IProduct } from '@root/core/modules/product/domain/productEntity/types';

export interface IProductMapper extends IMapper<TProductDTO, IProduct> {}
