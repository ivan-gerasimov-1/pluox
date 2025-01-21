import { useParams } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';
import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';

import {
	useVenueQueryById,
	useVenueRemoveMutation,
} from '@root/presentation/web-ui/modules/venues/venues.query';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { ScreenBody } from '@root/presentation/web-ui/uiKit/screen/screenBody';

import styles from './viewVenueScreen.module.css';

export function VenueViewScreen() {
	let navigation = useAppNavigation();
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

			<ScreenBody>
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

				<div className={styles.actionsContainer}>
					<Button
						onClick={() => {
							navigation.to(EAppPath.VENUES_EDIT.replace(':id', venue.id));
						}}
						size="m"
						isWide
					>
						Редактировать
					</Button>

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
			</ScreenBody>
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
