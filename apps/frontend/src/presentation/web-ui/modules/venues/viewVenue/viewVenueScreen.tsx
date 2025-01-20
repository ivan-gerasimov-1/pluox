import { useParams } from 'react-router';

import {
	useVenueRemoveMutation,
	useVenueQueryById,
} from '@root/presentation/web-ui/modules/venues/venues.query';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function VenueViewScreen() {
	let { venue } = useScreenLoader();

	let venueRemoveMutation = useVenueRemoveMutation();

	if (!venue) {
		return (
			<Screen>
				<Header title="Venue" />

				<div>Место не найдено</div>
			</Screen>
		);
	}

	return (
		<Screen>
			<Header title="Venue" />

			<div>
				<div>
					<pre>
						<b>ID:</b> {venue.id}
					</pre>
				</div>

				<br />

				<div>
					<b>Название:</b> {venue.name}
				</div>

				<br />

				<div>
					<b>Категории:</b> {venue.categoryName}
				</div>
			</div>

			<div>
				<Button
					onClick={() => {
						venueRemoveMutation.mutate(venue.id);
					}}
					size="m"
					color="red"
					isWide
				>
					Удалить
				</Button>
			</div>
		</Screen>
	);
}

function useScreenLoader() {
	let { id } = useParams();

	if (!id) {
		return {
			venue: null,
		};
	}

	let venue = useVenueQueryById(id);

	return {
		venue,
	};
}
