import { useParams } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';
import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';

import {
	useVenueArchiveMutation,
	useVenueQueryById,
	useVenueRemoveMutation,
} from '@root/presentation/web-ui/modules/venues/venues.query';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import styles from './viewVenueScreen.module.css';
import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';

export function VenueViewScreen() {
	let navigation = useAppNavigation();
	let { venue } = useScreenLoader();

	let venueArchiveMutation = useVenueArchiveMutation();
	let venueRemoveMutation = useVenueRemoveMutation();

	if (!venue) {
		return 'Venue not found';
	}

	return (
		<>
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
						venueArchiveMutation.mutate(venue.id);
					}}
					size="m"
					color="red"
					isWide
				>
					Архивировать
				</Button>

				<Button
					onClick={() => {
						venueRemoveMutation.mutate(venue.id);
					}}
					size="m"
					color="red"
					isWide
				>
					<Icon name={EIconName.Trash} />
				</Button>
			</div>
		</>
	);
}

function useScreenLoader() {
	let { id } = useParams();

	if (!id) {
		return {
			venue: null,
		};
	}

	/** @todo LV-105 */
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let venue = useVenueQueryById(id);

	return {
		venue,
	};
}
