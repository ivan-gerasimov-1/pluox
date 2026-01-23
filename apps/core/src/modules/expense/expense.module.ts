import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { ExpenseAmountService } from '@pluox/core/src/modules/expense/application/expenseAmountService/expenseAmountService';
import { ExpenseGroupingService } from '@pluox/core/src/modules/expense/application/expenseGroupingService/expenseGroupingService';
import { ExpenseQueryService } from '@pluox/core/src/modules/expense/application/expenseQueryService/expenseQueryService';
import { ExpenseService } from '@pluox/core/src/modules/expense/application/expenseService/expenseService';
import { CreateExpenseUseCase } from '@pluox/core/src/modules/expense/application/expenseUseCases/createExpenseUseCase';
import { DeleteExpenseUseCase } from '@pluox/core/src/modules/expense/application/expenseUseCases/deleteExpenseUseCase';
import { ExpenseUseCase } from '@pluox/core/src/modules/expense/application/expenseUseCases/expenseUseCase';
import { UpdateExpenseUseCase } from '@pluox/core/src/modules/expense/application/expenseUseCases/updateExpenseUseCase';
import { ExpenseApi } from '@pluox/core/src/modules/expense/infrastructure/expenseApi/expenseApi';
import { expenseDataSourceFactory } from '@pluox/core/src/modules/expense/infrastructure/expenseDataSource/expenseDataSourceFactory';
import { ExpenseMapper } from '@pluox/core/src/modules/expense/infrastructure/expenseMapper/expenseMapper';
import { ExpenseRepository } from '@pluox/core/src/modules/expense/infrastructure/expenseRepository/expenseRepository';

export const expenseModule: IModule = {
	providers: [
		{
			token: EServiceToken.EXPENSE_MAPPER,
			useClass: ExpenseMapper,
		},
		{
			token: EServiceToken.EXPENSE_REPOSITORY,
			useClass: ExpenseRepository,
			deps: [EServiceToken.EXPENSE_DATASOURCE, EServiceToken.EXPENSE_MAPPER],
		},
		{
			token: EServiceToken.EXPENSE_DATASOURCE,
			useFactory: expenseDataSourceFactory,
			deps: [EServiceToken.DATABASE],
		},
		{
			token: EServiceToken.EXPENSE_API,
			useClass: ExpenseApi,
			deps: [EServiceToken.API_CLIENT],
		},
		{
			token: EServiceToken.EXPENSE_CREATE_USE_CASE,
			useClass: CreateExpenseUseCase,
			deps: [
				EServiceToken.EXPENSE_REPOSITORY,
				EServiceToken.EXPENSE_MAPPER,
				EServiceToken.CATEGORY_USE_CASE,
				EServiceToken.SESSION_SERVICE,
				EServiceToken.ID_GENERATOR,
				EServiceToken.TEMPORAL,
			],
		},
		{
			token: EServiceToken.EXPENSE_UPDATE_USE_CASE,
			useClass: UpdateExpenseUseCase,
			deps: [EServiceToken.EXPENSE_REPOSITORY, EServiceToken.CATEGORY_USE_CASE],
		},
		{
			token: EServiceToken.EXPENSE_DELETE_USE_CASE,
			useClass: DeleteExpenseUseCase,
			deps: [EServiceToken.EXPENSE_REPOSITORY, EServiceToken.CATEGORY_USE_CASE],
		},
		{
			token: EServiceToken.EXPENSE_SERVICE,
			useClass: ExpenseService,
			deps: [
				EServiceToken.EXPENSE_GROUPING_SERVICE,
				EServiceToken.EXPENSE_AMOUNT_SERVICE,
				EServiceToken.EXPENSE_QUERY_SERVICE,
			],
		},
		{
			token: EServiceToken.EXPENSE_GROUPING_SERVICE,
			useClass: ExpenseGroupingService,
		},
		{
			token: EServiceToken.EXPENSE_AMOUNT_SERVICE,
			useClass: ExpenseAmountService,
			deps: [EServiceToken.APP_CONFIG, EServiceToken.CURRENCY_RATE_SERVICE],
		},
		{
			token: EServiceToken.EXPENSE_QUERY_SERVICE,
			useClass: ExpenseQueryService,
			deps: [
				EServiceToken.EXPENSE_REPOSITORY,
				EServiceToken.EXPENSE_MAPPER,
				EServiceToken.TEMPORAL,
			],
		},
		{
			token: EServiceToken.EXPENSE_USE_CASE,
			useClass: ExpenseUseCase,
			deps: [
				EServiceToken.EXPENSE_CREATE_USE_CASE,
				EServiceToken.EXPENSE_UPDATE_USE_CASE,
				EServiceToken.EXPENSE_DELETE_USE_CASE,
			],
		},
	],
};
