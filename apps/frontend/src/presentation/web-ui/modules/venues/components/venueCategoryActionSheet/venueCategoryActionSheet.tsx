import { venueCategoryActionSheetI18n } from './venueCategoryActionSheet.i18n';
import { useState } from 'react';

import type { TVenueDTO } from '@/core/modules/venue/application/dto/venueDTO';

import { useCategoryListQuery } from '@/presentation/web-ui/modules/categories/queries/categories.queries';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { useVenueUpdateMutation } from '@/presentation/web-ui/modules/venues/queries/venues.query';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import type { TDialogComponentProps } from '@/presentation/web-ui/uiKit/dialog/core/types';
import { ActionSheetSelect } from '@/presentation/web-ui/uiKit/dialog/react/actionSheetSelect/actionSheetSelect';

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
