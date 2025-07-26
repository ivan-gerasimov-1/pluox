import { EAppPath } from '@root/presentation/web-ui/appPath';
import {
	useVenueListArchivedQuery,
	useVenueListUnarchivedQuery,
} from '@root/presentation/web-ui/modules/venues/queries/venues.query';

import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';

import styles from './venueListScreen.module.css';

export function VenueListScreen() {
	let venueList = useVenueListUnarchivedQuery();
	let venueListArchived = useVenueListArchivedQuery();

	return (
		<>
			<AppLink to={EAppPath.VENUES_CREATE}>
				<Button
					onClick={() =>
						// eslint-disable-next-line no-empty-function
						{}
					}
					size="m"
					isWide
				>
					New
				</Button>
			</AppLink>

			<ul className={styles.venueList}>
				{venueList.map((venue) => (
					<li key={venue.id} className={styles.venueListItem}>
						<AppLink
							className={styles.venueLink}
							to={EAppPath.VENUES_VIEW.replace(':id', venue.id)}
						>
							{venue.name} ({venue.categoryName})
						</AppLink>
					</li>
				))}
			</ul>

			<hr />

			<ul className={styles.venueList}>
				{venueListArchived.map((venue) => (
					<li key={venue.id} className={styles.venueListItem}>
						<AppLink
							className={styles.venueLink}
							to={EAppPath.VENUES_VIEW.replace(':id', venue.id)}
						>
							{venue.name} ({venue.categoryName}, ARCHIVED)
						</AppLink>
					</li>
				))}
			</ul>
		</>
	);
}
