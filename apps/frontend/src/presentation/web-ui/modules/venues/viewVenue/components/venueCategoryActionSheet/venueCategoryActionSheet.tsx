import { useState } from 'react';

import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';

import { useCategoryListQuery } from '@root/presentation/web-ui/modules/categories/queries/categories.queries';
import { useVenueUpdateMutation } from '@root/presentation/web-ui/modules/venues/queries/venues.query';

import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import { venueCategoryActionSheetI18n } from './venueCategoryActionSheet.i18n';

import styles from './venueCategoryActionSheet.module.css';

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
			<ul
				style={{
					listStyle: 'none',
					margin: 0,
					padding: 0,
					paddingBlockEnd: '20px',
				}}
			>
				{categories?.map((category) => (
					<li
						key={category.id}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '10px',
						}}
						onClick={() => setSelectedCategory(category.id)}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<div
								style={{
									width: '25px',
									height: '25px',
									backgroundColor: 'var(--black-100)',
									borderRadius: '10px',
									marginInlineEnd: '15px',
								}}
							></div>
							<span>{category.name}</span>
						</div>
						{selectedCategory === category.id && (
							<span
								style={{
									fontWeight: 600,
								}}
							>
								✓
							</span>
						)}
					</li>
				))}
			</ul>

			<Button className={styles.actionSheetButton} onClick={handleSave} isWide>
				{intl.translate('save')}
			</Button>
		</>
	);
}
