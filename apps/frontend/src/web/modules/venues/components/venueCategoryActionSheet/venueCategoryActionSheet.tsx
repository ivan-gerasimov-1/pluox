import { venueCategoryActionSheetI18n } from './venueCategoryActionSheet.i18n';
import type { TVenueDTO } from '@pluox/core/src/modules/venue/application/dto/venueDTO';
import { useState } from 'react';

import { useCategoryListQuery } from '@/web/modules/categories/queries/categories.queries';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { useVenueUpdateMutation } from '@/web/modules/venues/queries/venues.query';
import { Button } from '@/web/uiKit/button/button';
import type { TDialogComponentProps } from '@/web/uiKit/dialog/core/types';
import { ActionSheetSelect } from '@/web/uiKit/dialog/react/actionSheetSelect/actionSheetSelect';

export function VenueCategoryActionSheet({
	venue,
	close,
}: TDialogComponentProps<{ venue: TVenueDTO }, void>) {
	let intl = useIntl(venueCategoryActionSheetI18n);

	let categories = useCategoryListQuery();
	let venueUpdateMutation = useVenueUpdateMutation(venue.id);

	let [selectedCategory, setSelectedCategory] = useState<string>(
		venue.categoryId,
	);

	function handleSave() {
		venueUpdateMutation.mutate(
			{
				categoryId: selectedCategory,
			},
			{
				onSuccess: () => {
					close();
				},
			},
		);
	}

	return (
		<>
			<ActionSheetSelect
				value={selectedCategory}
				items={categories}
				onSelect={setSelectedCategory}
			/>

			<Button onClick={handleSave} wide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
