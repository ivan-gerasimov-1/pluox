import { useState } from 'react';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import { venueNameActionSheetI18n } from './venueNameActionSheet.i18n';

import styles from './venueNameActionSheet.module.css';
import { useVenueUpdateMutation } from '@root/presentation/web-ui/modules/venues/queries/venues.query';
import { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

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
				className={styles.actionSheetInput}
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>

			<Button className={styles.actionSheetButton} onClick={handleSave} isWide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
