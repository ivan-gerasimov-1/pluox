import { useState } from 'react';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import { venueNameActionSheetI18n } from './venueNameActionSheet.i18n';

import styles from './venueNameActionSheet.module.css';

export function VenueNameActionSheet(
	props: TDialogComponentProps<{ venueName: string }>,
) {
	let intl = useIntl(venueNameActionSheetI18n);
	let [name, setName] = useState(props.venueName);

	function handleSave() {
		let nextName = name.trim();

		if (!nextName) {
			return;
		}

		props.close({
			venueName: nextName,
		});
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
