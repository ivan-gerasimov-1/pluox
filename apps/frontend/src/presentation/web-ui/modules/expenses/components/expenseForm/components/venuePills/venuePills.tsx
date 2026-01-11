import type { Id } from '@/core/domain/types';
import { useVenueListUnarchivedQuery } from '@/presentation/web-ui/modules/venues/queries/venues.query';
import { PillsSelect } from '@/presentation/web-ui/uiKit/pillsSelect/pillsSelect';

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
