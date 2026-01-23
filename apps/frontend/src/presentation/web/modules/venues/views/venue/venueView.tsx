import { useParams } from 'react-router';

import { Id } from '@/core/domain/types';

import { INVALID_ID } from '@/presentation/web/constants/invalidId';
import { useIntl } from '@/presentation/web/modules/intl/useIntl/useIntl';
import { VenueCategoryActionSheet } from '@/presentation/web/modules/venues/components/venueCategoryActionSheet/venueCategoryActionSheet';
import { VenueNameActionSheet } from '@/presentation/web/modules/venues/components/venueNameActionSheet/venueNameActionSheet';
import { useVenueOneByIdQuery } from '@/presentation/web/modules/venues/queries/venues.query';
import { venueViewI18n } from '@/presentation/web/modules/venues/views/venue/venueView.i18n';
import { useDialog } from '@/presentation/web/uiKit/dialog/react/dialog/useDialog';
import { EIconName } from '@/presentation/web/uiKit/icon/icons';
import { IconButton } from '@/presentation/web/uiKit/iconButton/iconButton';
import { Stack } from '@/presentation/web/uiKit/layout/layout';
import { Sheet } from '@/presentation/web/uiKit/sheet/sheet';
import {
	ValueAction,
	ValueActionLeading,
	ValueActionTrailing,
} from '@/presentation/web/uiKit/valueAction/valueAction';

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
