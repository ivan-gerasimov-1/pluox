import { useParams } from 'react-router';

import { useVenueQueryById } from '@root/presentation/web-ui/modules/venues/venues.query';

export function EditVenueScreen() {
	let { venue } = useScreenParams();

	if (!venue) {
		return <div>Место не найдено</div>;
	}

	return (
		<div>
			<div>
				<pre>
					<b>ID</b> {venue.id}
				</pre>
			</div>

			<div>
				<b>Название</b> {venue.name}
			</div>

			<div>
				<b>Категория</b> {venue.categoryId}
			</div>
		</div>
	);
}

function useScreenParams() {
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
