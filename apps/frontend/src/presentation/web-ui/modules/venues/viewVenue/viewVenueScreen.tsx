import { useParams } from 'react-router';

import { Id } from '@root/core/domain/types';

import { INVALID_ID } from '@root/presentation/web-ui/constants/invalidId';
import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { VenueCategoryActionSheet } from '@root/presentation/web-ui/modules/venues/components/venueCategoryActionSheet/venueCategoryActionSheet';
import {
	useVenueArchiveMutation,
	useVenueOneByIdQuery,
	useVenueRemoveMutation,
	useVenueUnarchiveMutation,
} from '@root/presentation/web-ui/modules/venues/queries/venues.query';
import { VenueNameActionSheet } from '@root/presentation/web-ui/modules/venues/viewVenue/components/venueNameActionSheet/venueNameActionSheet';
import { venueViewScreenI18n } from '@root/presentation/web-ui/modules/venues/viewVenue/viewVenueScreen.i18n';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Card } from '@root/presentation/web-ui/uiKit/card/card';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@root/presentation/web-ui/uiKit/iconButton/iconButton';
import { Stack } from '@root/presentation/web-ui/uiKit/layout/layout';
import {
	ValueAction,
	ValueActionLeading,
	ValueActionTrailing,
} from '@root/presentation/web-ui/uiKit/valueAction/valueAction';

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
		<>
			<Stack>
				<Card>
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
				</Card>
			</Stack>

			<div className="gap-4 flex">
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
			</div>
		</>
	);
}
