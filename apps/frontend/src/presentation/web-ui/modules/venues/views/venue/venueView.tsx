import { useParams } from 'react-router';

import { Id } from '@/core/domain/types';

import { INVALID_ID } from '@/presentation/web-ui/constants/invalidId';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { VenueCategoryActionSheet } from '@/presentation/web-ui/modules/venues/components/venueCategoryActionSheet/venueCategoryActionSheet';
import { VenueNameActionSheet } from '@/presentation/web-ui/modules/venues/components/venueNameActionSheet/venueNameActionSheet';
import { useVenueOneByIdQuery } from '@/presentation/web-ui/modules/venues/queries/venues.query';
import { venueViewI18n } from '@/presentation/web-ui/modules/venues/views/venue/venueView.i18n';
import { useDialog } from '@/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { EIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@/presentation/web-ui/uiKit/iconButton/iconButton';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { Sheet } from '@/presentation/web-ui/uiKit/sheet/sheet';
import {
	ValueAction,
	ValueActionLeading,
	ValueActionTrailing,
} from '@/presentation/web-ui/uiKit/valueAction/valueAction';

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
