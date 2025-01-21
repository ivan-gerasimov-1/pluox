import { useMemo } from 'react';

import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

import styles from './venuePills.module.css';

type TVenuePillsProps = {
	onSelect(payload?: { venueId: string; categoryId: string }): void;
};

export function VenuePills(props: TVenuePillsProps) {
	let venueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let venues = useMemo(() => venueQueryService.getAll(), []);

	return (
		<div className={styles.wrapper}>
			{venues.map((venue) => {
				return (
					<button
						key={venue.id}
						id={venue.id}
						type="button"
						className={styles.pill}
						aria-pressed="false"
						onClick={(event) => {
							let target = event.currentTarget;
							let isPressed = target.getAttribute('aria-pressed') === 'true';
							let nextState = !isPressed;

							for (let venue of venues) {
								let element = document.getElementById(venue.id);

								if (!element) {
									continue;
								}

								element.setAttribute('aria-pressed', 'false');
							}

							target.setAttribute('aria-pressed', String(nextState));

							props.onSelect(
								nextState
									? {
											venueId: target.id,
											categoryId: venue.categoryId,
										}
									: undefined,
							);
						}}
					>
						{venue.name}
					</button>
				);
			})}
		</div>
	);
}
