import { useParams } from 'react-router';

import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { useVenueQuery } from '@root/presentation/web-ui/modules/venues/venues.query';

export function EditVenueScreen() {
	let { venue } = useScreenParams();

	return (
		<Screen>
			<Header title="Venue" />

			<div>
				<b>ID</b> {venue?.id}
			</div>
			<div>
				<b>Название</b> {venue?.name}
			</div>
		</Screen>
	);
}

function useScreenParams() {
	let { id } = useParams();
	let venue = useVenueQuery(id!);

	return {
		venue,
	};
}
