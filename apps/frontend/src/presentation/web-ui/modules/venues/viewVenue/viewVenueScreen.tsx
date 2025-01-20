import { useParams } from 'react-router';

import { useVenueByIdQuery } from '@root/presentation/web-ui/modules/venues/venues.query';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function VenueViewScreen() {
	let { venue } = useScreenLoader();

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
					<b>ID:</b> {venue.id}
				</div>

				<br />

				<div>
					<b>Название:</b> {venue.name}
				</div>

				<br />

				<div>
					<b>Категория:</b> {venue.categoryId}
				</div>
			</div>

			<div>
				<Button onClick={() => {}} size="m" color="red" isWide>
					Удалить
				</Button>
			</div>
		</Screen>
	);
}

function useScreenParams(): {
	id: string | null;
} {
	let { id } = useParams();

	return {
		id: id ?? null,
	};
}

function useScreenLoader() {
	let { id } = useScreenParams();

	if (!id) {
		return {
			venue: null,
		};
	}

	let venue = useVenueByIdQuery(id);

	return {
		venue,
	};
}
