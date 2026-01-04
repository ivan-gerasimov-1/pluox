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
import { Card, Stack } from '@root/presentation/web-ui/uiKit/card/card';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@root/presentation/web-ui/uiKit/iconButton/iconButton';
import {
	ValueAction,
	ValueActionContent,
	ValueActionLabel,
	ValueActionLeading,
	ValueActionTrailing,
} from '@root/presentation/web-ui/uiKit/valueAction/valueAction';

export function VenueViewScreen() {
	let navigation = useAppNavigation();
	let dialog = useDialog();
	let intl = useIntl(venueViewScreenI18n);

	let { venue } = useScreenLoader();

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
						<ValueActionLeading>
							<ValueActionLabel>ID</ValueActionLabel>
							<ValueActionContent>{venue.id}</ValueActionContent>
						</ValueActionLeading>
					</ValueAction>

					<ValueAction>
						<ValueActionLeading>
							<ValueActionLabel>{intl.translate('name')}</ValueActionLabel>
							<ValueActionContent>{venue.name}</ValueActionContent>
						</ValueActionLeading>

						<ValueActionTrailing>
							<IconButton
								iconName={EIconName.Edit}
								onClick={() => dialog.render(VenueNameActionSheet, { venue })}
							/>
						</ValueActionTrailing>
					</ValueAction>

					<ValueAction>
						<ValueActionLeading>
							<ValueActionLabel>
								{intl.translate('categories')}
							</ValueActionLabel>
							<ValueActionContent>{venue.categoryName}</ValueActionContent>
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

			<div className="gap-3 flex">
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
					{venue.isArchived
						? intl.translate('unarchive')
						: intl.translate('archive')}
				</Button>

				<div>
					<Button
						onClick={() => venueRemoveMutation.mutate(venue.id)}
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
