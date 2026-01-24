import type { Id } from '@core/domain/types';

import { useVenueListUnarchivedQuery } from '@/web/modules/venues/queries/venues.query';

import { PillsSelect } from '@kit/pillsSelect/pillsSelect';

type TVenuePillsProps = {
	value: Id | null;
	onSelect(payload: { venueId?: Id; categoryId?: Id }): void;
};

export function VenuePills(props: TVenuePillsProps) {
	let venues = useVenueListUnarchivedQuery();

	return (
		<PillsSelect
			items={venues}
			value={props.value}
			onSelect={(payload) => {
				props.onSelect({
					venueId: payload?.id,
					categoryId: payload?.categoryId,
				});
			}}
		/>
	);
}
