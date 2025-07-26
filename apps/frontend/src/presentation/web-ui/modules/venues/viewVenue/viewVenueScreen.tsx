import { useParams } from 'react-router';

import { Id } from '@root/core/domain/types';

import { EAppPath } from '@root/presentation/web-ui/appPath';
import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';

import {
	useVenueArchiveMutation,
	useVenueQueryById,
	useVenueRemoveMutation,
} from '@root/presentation/web-ui/modules/venues/venues.query';

import { INVALID_ID } from '@root/presentation/web-ui/constants/invalidId';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';

import styles from './viewVenueScreen.module.css';

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

				<div>
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
			</div>
		</>
	);
}

function useScreenLoader() {
	let { id = INVALID_ID } = useParams<{ id: Id }>();

	let venue = useVenueQueryById(id);

	return {
		venue,
	};
}
