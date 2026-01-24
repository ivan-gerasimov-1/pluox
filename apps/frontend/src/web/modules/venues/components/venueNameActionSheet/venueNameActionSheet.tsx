import { venueNameActionSheetI18n } from './venueNameActionSheet.i18n';
import { useState } from 'react';

import { TVenueDTO } from '@core/modules/venue/application/dto/venueDTO';

import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { useVenueUpdateMutation } from '@/web/modules/venues/queries/venues.query';

import { Button } from '@/web/uiKit/button/button';
import type { TDialogComponentProps } from '@/web/uiKit/dialog/core/types';
import { Input } from '@/web/uiKit/input/input';

export function VenueNameActionSheet({
	venue,
	close,
}: TDialogComponentProps<{ venue: TVenueDTO }, {}>) {
	let intl = useIntl(venueNameActionSheetI18n);
	let venueUpdateMutation = useVenueUpdateMutation(venue.id);
	let [name, setName] = useState(venue.name);

	function handleSave() {
		let nextName = name.trim();

		if (!nextName) {
			return;
		}

		venueUpdateMutation.mutate(
			{
				name: nextName,
			},
			{
				onSuccess: () => {
					close({});
				},
			},
		);
	}

	return (
		<>
			<Input
				type="text"
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>

			<Button className="mt-5" onClick={handleSave} wide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
