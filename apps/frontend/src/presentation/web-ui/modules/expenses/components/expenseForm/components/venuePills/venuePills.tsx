import { useMemo } from 'react';

import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import { PillsSelect } from '@root/presentation/web-ui/uiKit/pillsSelect/pillsSelect';

type TVenuePillsProps = {
	onSelect(payload: { venueId?: string; categoryId?: string }): void;
};

export function VenuePills(props: TVenuePillsProps) {
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let venues = useMemo(() => venueQueryService.getAll(), []);

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
