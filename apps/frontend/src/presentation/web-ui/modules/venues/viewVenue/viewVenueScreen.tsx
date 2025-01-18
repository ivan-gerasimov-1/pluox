import { useParams } from 'react-router';

import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function ViewVenueScreen() {
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

function useScreenParams() {
	let { id } = useParams();

	return {
		id,
	};
}
