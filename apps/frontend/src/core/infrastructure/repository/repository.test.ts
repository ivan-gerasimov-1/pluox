import type { Id } from '@/core/domain/types';
import type { IDataSource } from '@/core/infrastructure/dataSource/types';
import type { IMapper } from '@/core/infrastructure/mapper/types';
import { Repository } from '@/core/infrastructure/repository/repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Repository', () => {
	const TEST_ID = 'ID';
	const TEST_FIELD = 'test';

	let repository: Repository<TestEntity, TestDTO, TestFindOptions>;
	let dataSource: IDataSource<TestDTO, TestFindOptions>;
	let mapper: IMapper<TestDTO, TestEntity>;

	beforeEach(() => {
		dataSource = {
			upsert: vi.fn(),
			findOne: vi.fn(),
			findMany: vi.fn(),
			remove: vi.fn(),
			insert: vi.fn(),
			update: vi.fn(),
			findAll: vi.fn(),
			clear: vi.fn(),
		};

		mapper = {
			toDTO: vi.fn(),
			toEntity: vi.fn(),
		};

		repository = new Repository(dataSource, mapper);
	});

	describe('save', () => {
		it('should save entity using data source', () => {
			const entity = new TestEntity(TEST_ID, TEST_FIELD);
			const entityDTO = {
				id: TEST_ID,
				field: TEST_FIELD,
			};

			vi.mocked(mapper.toDTO).mockReturnValue(entityDTO);

			let result = repository.save(entity);

			expect(mapper.toDTO).toHaveBeenCalledWith(entity);
			expect(dataSource.upsert).toHaveBeenCalledWith(TEST_ID, entityDTO);

			expect(result).toEqual(entityDTO);
		});
	});

	describe('findById', () => {
		it('should return entity when found', () => {
			let entity = new TestEntity(TEST_ID, TEST_FIELD);
			let entityDTO = {
				id: TEST_ID,
				field: TEST_FIELD,
			};

			vi.mocked(dataSource.findOne).mockReturnValue(entityDTO);
			vi.mocked(mapper.toEntity).mockReturnValue(entity);

			let result = repository.findById(TEST_ID);

			expect(dataSource.findOne).toHaveBeenCalledWith({
				id: TEST_ID,
			});
			expect(mapper.toEntity).toHaveBeenCalledWith(entityDTO);
			expect(result).toEqual(entity);
		});

		it('should return null when not found', () => {
			vi.mocked(dataSource.findOne).mockReturnValue(null);

			let result = repository.findById(TEST_ID);

			expect(dataSource.findOne).toHaveBeenCalledWith({
				id: TEST_ID,
			});
			expect(mapper.toEntity).not.toHaveBeenCalled();
			expect(result).toBeNull();
		});
	});

	describe('findMany', () => {
		it('should return mapped entities with total', () => {
			let entity = new TestEntity(TEST_ID, TEST_FIELD);
			let entityDTO = {
				id: TEST_ID,
				field: TEST_FIELD,
			};
			let options = {
				filter: 'test',
			};

			vi.mocked(dataSource.findMany).mockReturnValue({
				items: [entityDTO],
				total: 1,
			});
			vi.mocked(mapper.toEntity).mockReturnValue(entity);

			let result = repository.findMany(options);

			expect(dataSource.findMany).toHaveBeenCalledWith(options);
			expect(mapper.toEntity).toHaveBeenCalledWith(entityDTO);
			expect(result).toEqual({
				items: [entity],
				total: 1,
			});
		});
	});

	describe('remove', () => {
		it('should remove entity and return it when found', () => {
			let entity = new TestEntity(TEST_ID, TEST_FIELD);
			let entityDTO = {
				id: TEST_ID,
				field: TEST_FIELD,
			};

			vi.mocked(dataSource.findOne).mockReturnValue(entityDTO);
			vi.mocked(mapper.toEntity).mockReturnValue(entity);

			let result = repository.remove(TEST_ID);

			expect(dataSource.findOne).toHaveBeenCalledWith({
				id: TEST_ID,
			});
			expect(dataSource.remove).toHaveBeenCalledWith(TEST_ID);
			expect(mapper.toEntity).toHaveBeenCalledWith(entityDTO);
			expect(result).toBe(entity);
		});

		it('should return null when not found', () => {
			vi.mocked(dataSource.findOne).mockReturnValue(null);

			let result = repository.remove(TEST_ID);

			expect(dataSource.findOne).toHaveBeenCalledWith({
				id: TEST_ID,
			});
			expect(dataSource.remove).not.toHaveBeenCalled();
			expect(mapper.toEntity).not.toHaveBeenCalled();
			expect(result).toBeNull();
		});
	});
});

class TestEntity {
	constructor(
		public readonly id: Id,
		public readonly field: string,
	) {}
}

type TestDTO = {
	id: Id;
	field: string;
};

type TestFindOptions = {
	filter?: string;
};
