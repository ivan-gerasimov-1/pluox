import type { Id } from '@root/core/domain/types';

type TVenueQueryType = 'list' | 'list:archived' | 'one:id';

export function createVenueQuery(type: 'list'): [TVenueQueryType];
export function createVenueQuery(type: 'list:archived'): [TVenueQueryType];
export function createVenueQuery(
	type: 'one:id',
	options: { id: Id },
): [TVenueQueryType, Id];
export function createVenueQuery(type: TVenueQueryType, options?: { id: Id }) {
	switch (type) {
		case 'list':
			return ['venue:list'];
		case 'list:archived':
			return ['venue:list:archived'];
		case 'one:id':
			return ['venue:one:id', options?.id];
		default: {
			let invalidType: never = type;
			throw new Error(`Unknown venue query type: ${invalidType}`);
		}
	}
}
