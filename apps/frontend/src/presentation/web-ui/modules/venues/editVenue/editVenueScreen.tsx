import { useParams } from 'react-router';

import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { ScreenBody } from '@root/presentation/web-ui/uiKit/screen/screenBody';

import { useVenueQueryById } from '@root/presentation/web-ui/modules/venues/venues.query';

export function EditVenueScreen() {
	let { venue } = useScreenParams();

	if (!venue) {
		return (
			<Screen>
				<Header title="Venue" />

				<ScreenBody>
					<div>Место не найдено</div>
				</ScreenBody>
			</Screen>
		);
	}

	return (
		<Screen>
			<Header title="Venue" />

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
		</Screen>
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
