import { useParams } from 'react-router';

import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function VenueViewScreen() {
	let screenParams = useScreenParams();

	return (
		<Screen>
			<Header title="Venue" />

			<div>
				<div>{screenParams.id}</div>
			</div>
		</Screen>
	);
}

function useScreenParams(): {
	id: string;
} {
	let { id } = useParams();

	if (!id) {
		throw new Error('Venue identifier is not specified');
	}

	return {
		id,
	};
}
