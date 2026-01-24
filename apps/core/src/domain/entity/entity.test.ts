import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Entity } from '@core/domain/entity/entity';

describe('Entity', () => {
	const TEST_ID = 'ID';
	const TEST_CREATED_AT = '2025-02-01T07:20:00.000Z';

	let entity: TestEntity;

	beforeEach(() => {
		entity = new TestEntity(TEST_ID, TEST_CREATED_AT);
	});

	it('should create entity with required fields', () => {
		expect(entity.id).toBe(TEST_ID);
		expect(entity.createdAt).toBe(TEST_CREATED_AT);
		expect(entity.modifiedAt).toBe(TEST_CREATED_AT);
	});

	it('should create entity with custom modifiedAt', () => {
		const modifiedAt = '2025-02-01T08:20:00.000Z';

		entity = new TestEntity(TEST_ID, TEST_CREATED_AT, modifiedAt);

		expect(entity.modifiedAt).toBe(modifiedAt);
	});

	it('should update modifiedAt when touching entity', () => {
		let modifiedAt = '2025-02-01T09:20:00.000Z';
		let modifiedFieldValue = 'modified';

		vi.useFakeTimers();
		vi.setSystemTime(new Date(modifiedAt));

		entity.field = modifiedFieldValue;

		expect(entity.field).toBe(modifiedFieldValue);
		expect(entity.modifiedAt).toBe(modifiedAt);

		vi.useRealTimers();
	});
});

class TestEntity extends Entity {
	#field: string = 'default';

	public get field(): string {
		return this.#field;
	}

	public set field(value: string) {
		this.#field = value;

		this.touch();
	}
}
