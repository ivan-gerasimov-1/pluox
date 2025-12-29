import { venueNameActionSheetI18n } from './venueNameActionSheet.i18n';
import { useState } from 'react';

import { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { useVenueUpdateMutation } from '@root/presentation/web-ui/modules/venues/queries/venues.query';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';
import { cls } from '@root/presentation/web-ui/utils/classnames';

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
			<input
				type="text"
				className={cls(
					'px-4 py-3 w-full',
					'border-neutral-200/50 rounded-2xl border',
					'text-sm font-[inherit] text-inherit',
				)}
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>

			<Button className="mt-5" onClick={handleSave} isWide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
