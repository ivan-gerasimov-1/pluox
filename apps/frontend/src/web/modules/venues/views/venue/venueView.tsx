import { Id } from '@pluox/core/src/domain/types';
import { useParams } from 'react-router';

import { INVALID_ID } from '@/web/constants/invalidId';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { VenueCategoryActionSheet } from '@/web/modules/venues/components/venueCategoryActionSheet/venueCategoryActionSheet';
import { VenueNameActionSheet } from '@/web/modules/venues/components/venueNameActionSheet/venueNameActionSheet';
import { useVenueOneByIdQuery } from '@/web/modules/venues/queries/venues.query';
import { venueViewI18n } from '@/web/modules/venues/views/venue/venueView.i18n';
import { useDialog } from '@/web/uiKit/dialog/react/dialog/useDialog';
import { EIconName } from '@/web/uiKit/icon/icons';
import { IconButton } from '@/web/uiKit/iconButton/iconButton';
import { Stack } from '@/web/uiKit/layout/layout';
import { Sheet } from '@/web/uiKit/sheet/sheet';
import {
	ValueAction,
	ValueActionLeading,
	ValueActionTrailing,
} from '@/web/uiKit/valueAction/valueAction';

export function VenueView() {
	let { id = INVALID_ID } = useParams<{ id: Id }>();

	let dialog = useDialog();
	let intl = useIntl(venueViewI18n);

	let venue = useVenueOneByIdQuery(id);

	if (!venue) {
		return <div>{intl.translate('notFoundError')}</div>;
	}

	return (
		<Sheet asChild>
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
							onClick={() =>
								dialog.render(VenueNameActionSheet, {
									venue,
								})
							}
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
								dialog.render(VenueCategoryActionSheet, {
									venue,
								})
							}
						/>
					</ValueActionTrailing>
				</ValueAction>
			</Stack>
		</Sheet>
	);
}
