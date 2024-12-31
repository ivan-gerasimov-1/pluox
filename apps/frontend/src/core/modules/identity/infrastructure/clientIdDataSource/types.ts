import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { Id } from '@domain/types';

export interface IClientIdDataSource extends IDataSource<Id> {}
