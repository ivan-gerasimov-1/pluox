import { useParams } from 'react-router';

import { Id } from '@root/core/domain/types';

import { INVALID_ID } from '@root/presentation/web-ui/constants/invalidId';

import { useVenueOneByIdQuery } from '@root/presentation/web-ui/modules/venues/venues.query';

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
	let { id = INVALID_ID } = useParams<{ id: Id }>();

	let venue = useVenueOneByIdQuery(id);

	return {
		venue,
	};
}
