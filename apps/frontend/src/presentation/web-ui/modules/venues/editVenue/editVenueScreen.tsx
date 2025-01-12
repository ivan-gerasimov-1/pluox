import { useParams } from 'react-router';

import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function EditVenueScreen() {
	let { id } = useScreenParams();

	return (
		<Screen>
			<Header title={'Edit Venue:' + id} />
		</Screen>
	);
}

function useScreenParams() {
	let params = useParams();

	return {
		id: params.id,
	};
}
