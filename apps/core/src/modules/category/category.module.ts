import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { CategoryQueryService } from '@pluox/core/src/modules/category/application/categoryQueryService/categoryQueryService';
import { CategoryService } from '@pluox/core/src/modules/category/application/categoryService/categoryService';
import { CategoryCreateUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/categoryCreateUseCase';
import { CategoryDeleteUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/categoryDeleteUseCase';
import { CategoryInitializeUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/categoryInitializeUseCase';
import { CategoryUpdateUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/categoryUpdateUseCase';
import { CategoryUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/categoryUseCase';
import { CategoryWeightUseCase } from '@pluox/core/src/modules/category/application/categoryUseCase/categoryWeightUseCase';
import { categoryDataSourceFactory } from '@pluox/core/src/modules/category/infrastructure/categoryDataSource/categoryDataSourceFactory';
import { CategoryMapper } from '@pluox/core/src/modules/category/infrastructure/categoryMapper/categoryMapper';
import { CategoryRepository } from '@pluox/core/src/modules/category/infrastructure/categoryRepository/categoryRepository';

export const categoryModule: IModule = {
	providers: [
		{
			token: EServiceToken.CATEGORY_DATASOURCE,
			useFactory: categoryDataSourceFactory,
			deps: [EServiceToken.DATABASE],
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
			token: EServiceToken.CATEGORY_SERVICE,
			useClass: CategoryService,
			deps: [EServiceToken.CATEGORY_REPOSITORY],
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
				EServiceToken.ID_GENERATOR,
				EServiceToken.SESSION_SERVICE,
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
