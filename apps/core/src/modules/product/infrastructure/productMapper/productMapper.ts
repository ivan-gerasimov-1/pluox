import type { TProductDTO } from '@core/modules/product/application/dto/productDTO';
import { Product } from '@core/modules/product/domain/productEntity/product';
import type { IProduct } from '@core/modules/product/domain/productEntity/types';
import type { IProductMapper } from '@core/modules/product/infrastructure/productMapper/types';

export class ProductMapper implements IProductMapper {
	public toDTO(entity: Product): TProductDTO {
		return {
			id: entity.id,
			createdAt: entity.createdAt,
			modifiedAt: entity.modifiedAt,
		};
	}

	public toEntity(dto: TProductDTO): IProduct {
		return new Product(dto.id, dto.createdAt, dto.modifiedAt);
	}
}
