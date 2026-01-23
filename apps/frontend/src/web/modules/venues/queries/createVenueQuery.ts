import type { Id } from '@pluox/core/src/domain/types';

type TVenueQueryType = 'list' | 'one:id';

export function createVenueQuery(
	type: 'list',
	options?: { archived?: boolean },
): [TVenueQueryType];
export function createVenueQuery(
	type: 'one:id',
	options: { id: Id },
): [TVenueQueryType, Id];
export function createVenueQuery(
	type: TVenueQueryType,
	options?: { id?: Id; archived?: boolean },
) {
	switch (type) {
		case 'list': {
			let queryKey: unknown[] = ['venue:list'];

			if (options) {
				queryKey.push(options);
			}

			return queryKey;
		}
		case 'one:id':
			return ['venue:one:id', options?.id];
		default: {
			let invalidType: never = type;
			throw new Error(`Unknown venue query type: ${invalidType}`);
		}
	}
}
