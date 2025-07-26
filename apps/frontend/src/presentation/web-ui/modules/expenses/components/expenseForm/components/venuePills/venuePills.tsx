import { useVenueListUnarchivedQuery } from '@root/presentation/web-ui/modules/venues/queries/venues.query';

import { PillsSelect } from '@root/presentation/web-ui/uiKit/pillsSelect/pillsSelect';

type TVenuePillsProps = {
	onSelect(payload: { venueId?: string; categoryId?: string }): void;
};

export function VenuePills(props: TVenuePillsProps) {
	let venues = useVenueListUnarchivedQuery();

	return (
		<PillsSelect
			items={venues}
			onSelect={(payload) => {
				props.onSelect({
					venueId: payload?.id,
					categoryId: payload?.categoryId,
				});
			}}
		/>
	);
}
