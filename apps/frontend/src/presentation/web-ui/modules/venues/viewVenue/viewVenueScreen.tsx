import { useParams } from 'react-router';

import { Id } from '@root/core/domain/types';

import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';

import {
	useVenueArchiveMutation,
	useVenueOneByIdQuery,
	useVenueRemoveMutation,
	useVenueUnarchiveMutation,
} from '@root/presentation/web-ui/modules/venues/queries/venues.query';

import { INVALID_ID } from '@root/presentation/web-ui/constants/invalidId';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@root/presentation/web-ui/uiKit/iconButton/iconButton';

import { VenueNameActionSheet } from '@root/presentation/web-ui/modules/venues/viewVenue/components/venueNameActionSheet/venueNameActionSheet';

import styles from './viewVenueScreen.module.css';

export function VenueViewScreen() {
	let navigation = useAppNavigation();
	let dialog = useDialog();

	let { venue } = useScreenLoader();

	let venueArchiveMutation = useVenueArchiveMutation();
	let venueUnarchiveMutation = useVenueUnarchiveMutation();

	let venueRemoveMutation = useVenueRemoveMutation({
		onSuccess: () => {
			navigation.venueListPage();
		},
	});

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

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<b>Название: </b> {venue.name}
					<IconButton
						iconName={EIconName.Edit}
						onClick={() => dialog.render(VenueNameActionSheet, { venue })}
					/>
				</div>

				<br />

				<div>
					<b>Категории:</b> {venue.categoryName}
				</div>
			</div>

			<div className={styles.actionsContainer}>
				<Button
					onClick={() => {
						if (venue.isArchived) {
							venueUnarchiveMutation.mutate(venue.id);
						} else {
							venueArchiveMutation.mutate(venue.id);
						}
					}}
					isWide
				>
					{venue.isArchived ? 'Разархивировать' : 'Архивировать'}
				</Button>

				<div>
					<Button
						onClick={() => {
							venueRemoveMutation.mutate(venue.id);
						}}
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

	let venue = useVenueOneByIdQuery(id);

	return {
		venue,
	};
}
