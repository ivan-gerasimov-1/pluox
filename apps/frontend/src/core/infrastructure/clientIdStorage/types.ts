import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { Id } from '@domain/types';

export interface IClientIdStorage extends IDataSource<Id> {}
