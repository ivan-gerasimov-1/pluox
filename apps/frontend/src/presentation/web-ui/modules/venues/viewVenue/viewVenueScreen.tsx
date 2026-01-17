import { useParams } from 'react-router';

import { Id } from '@/core/domain/types';

import { INVALID_ID } from '@/presentation/web-ui/constants/invalidId';
import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { VenueCategoryActionSheet } from '@/presentation/web-ui/modules/venues/components/venueCategoryActionSheet/venueCategoryActionSheet';
import {
	useVenueArchiveMutation,
	useVenueOneByIdQuery,
	useVenueRemoveMutation,
	useVenueUnarchiveMutation,
} from '@/presentation/web-ui/modules/venues/queries/venues.query';
import { VenueNameActionSheet } from '@/presentation/web-ui/modules/venues/viewVenue/components/venueNameActionSheet/venueNameActionSheet';
import { venueViewScreenI18n } from '@/presentation/web-ui/modules/venues/viewVenue/viewVenueScreen.i18n';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import { useDialog } from '@/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { Icon } from '@/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@/presentation/web-ui/uiKit/iconButton/iconButton';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { Paper } from '@/presentation/web-ui/uiKit/paper/paper';
import {
	ValueAction,
	ValueActionLeading,
	ValueActionTrailing,
} from '@/presentation/web-ui/uiKit/valueAction/valueAction';

export function VenueViewScreen() {
	let { id = INVALID_ID } = useParams<{ id: Id }>();

	let navigation = useAppNavigation();
	let dialog = useDialog();
	let intl = useIntl(venueViewScreenI18n);

	let venue = useVenueOneByIdQuery(id);

	let venueArchiveMutation = useVenueArchiveMutation();
	let venueUnarchiveMutation = useVenueUnarchiveMutation();

	let venueRemoveMutation = useVenueRemoveMutation({
		onSuccess: () => {
			navigation.venueListPage();
		},
	});

	if (!venue) {
		return <div>{intl.translate('notFoundError')}</div>;
	}

	return (
		<Stack>
			<Paper asChild>
				<Stack>
					<ValueAction>
						<ValueActionLeading label="ID">{venue.id}</ValueActionLeading>
					</ValueAction>

					<ValueAction>
						<ValueActionLeading label={intl.translate('name')}>
							{venue.name}
						</ValueActionLeading>

						<ValueActionTrailing>
							<IconButton
								iconName={EIconName.Edit}
								onClick={() => dialog.render(VenueNameActionSheet, { venue })}
							/>
						</ValueActionTrailing>
					</ValueAction>

					<ValueAction>
						<ValueActionLeading label={intl.translate('categories')}>
							{venue.categoryName}
						</ValueActionLeading>

						<ValueActionTrailing>
							<IconButton
								iconName={EIconName.Edit}
								onClick={() =>
									dialog.render(VenueCategoryActionSheet, { venue })
								}
							/>
						</ValueActionTrailing>
					</ValueAction>
				</Stack>
			</Paper>

			<Stack row>
				<Button
					onClick={() => {
						if (venue.isArchived) {
							venueUnarchiveMutation.mutate(venue.id);
						} else {
							venueArchiveMutation.mutate(venue.id);
						}
					}}
					wide
				>
					{venue.isArchived
						? intl.translate('unarchive')
						: intl.translate('archive')}
				</Button>

				<Button
					onClick={() => venueRemoveMutation.mutate(venue.id)}
					intent="danger"
				>
					<Icon name={EIconName.Trash} />
				</Button>
			</Stack>
		</Stack>
	);
}
