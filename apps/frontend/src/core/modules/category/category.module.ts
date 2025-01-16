import {
	EServiceToken,
	type IModule,
} from '@root/core/infrastructure/serviceContainer/types';

import { CategoryQueryService } from '@root/core/modules/category/application/categoryQueryService/categoryQueryService';
import {
	CategoryServiceFactory,
	ICategoryServiceFactory,
} from '@root/core/modules/category/application/categoryService/factory';
import { CategoryCreateUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryCreateUseCase';
import { CategoryDeleteUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryDeleteUseCase';
import { CategoryInitializeUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryInitializeUseCase';
import { CategoryUpdateUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryUpdateUseCase';
import { CategoryUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryUseCase';
import { CategoryWeightUseCase } from '@root/core/modules/category/application/categoryUseCase/categoryWeightUseCase';
import { CategoryInMemoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/categoryDataSource';
import { CategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/categoryMapper';
import { CategoryRepository } from '@root/core/modules/category/infrastructure/categoryRepository/categoryRepository';

export const categoryModule: IModule = {
	providers: [
		{
			token: EServiceToken.CATEGORY_DATASOURCE,
			useClass: CategoryInMemoryDataSource,
		},
		{
			token: EServiceToken.CATEGORY_REPOSITORY,
			useClass: CategoryRepository,
			deps: [EServiceToken.CATEGORY_DATASOURCE, EServiceToken.CATEGORY_MAPPER],
		},
		{
			token: EServiceToken.CATEGORY_MAPPER,
			useClass: CategoryMapper,
		},
		{
			token: EServiceToken.CATEGORY_SERVICE_FACTORY,
			useClass: CategoryServiceFactory,
			deps: [
				EServiceToken.CATEGORY_REPOSITORY,
				EServiceToken.TEMPORAL,
				EServiceToken.EXPENSE_REPOSITORY,
				EServiceToken.CATEGORY_USE_CASE,
			],
		},
		{
			token: EServiceToken.CATEGORY_SERVICE,
			useFactory: (categoryServiceFactory: ICategoryServiceFactory) => {
				return categoryServiceFactory.create();
			},
			deps: [EServiceToken.CATEGORY_SERVICE_FACTORY],
		},
		{
			token: EServiceToken.CATEGORY_USE_CASE,
			useClass: CategoryUseCase,
			deps: [
				EServiceToken.CATEGORY_INITIALIZE_USE_CASE,
				EServiceToken.CATEGORY_CREATE_USE_CASE,
				EServiceToken.CATEGORY_UPDATE_USE_CASE,
				EServiceToken.CATEGORY_DELETE_USE_CASE,
				EServiceToken.CATEGORY_WEIGHT_USE_CASE,
			],
		},
		{
			token: EServiceToken.CATEGORY_INITIALIZE_USE_CASE,
			useClass: CategoryInitializeUseCase,
			deps: [
				EServiceToken.CATEGORY_REPOSITORY,
				EServiceToken.CATEGORY_MAPPER,
				EServiceToken.EXPENSE_REPOSITORY,
				EServiceToken.TEMPORAL,
			],
		},
		{
			token: EServiceToken.CATEGORY_CREATE_USE_CASE,
			useClass: CategoryCreateUseCase,
			deps: [
				EServiceToken.ID_GENERATOR,
				EServiceToken.TEMPORAL,
				EServiceToken.CATEGORY_MAPPER,
				EServiceToken.CATEGORY_REPOSITORY,
			],
		},
		{
			token: EServiceToken.CATEGORY_UPDATE_USE_CASE,
			useClass: CategoryUpdateUseCase,
		},
		{
			token: EServiceToken.CATEGORY_DELETE_USE_CASE,
			useClass: CategoryDeleteUseCase,
			deps: [EServiceToken.CATEGORY_REPOSITORY],
		},
		{
			token: EServiceToken.CATEGORY_WEIGHT_USE_CASE,
			useClass: CategoryWeightUseCase,
			deps: [EServiceToken.CATEGORY_REPOSITORY],
		},
		{
			token: EServiceToken.CATEGORY_QUERY_SERVICE,
			useClass: CategoryQueryService,
			deps: [EServiceToken.CATEGORY_REPOSITORY, EServiceToken.CATEGORY_MAPPER],
		},
	],
};
