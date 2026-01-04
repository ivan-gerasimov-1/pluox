import { venueListScreenI18n } from './venueListScreen.i18n';

import { EAppPath } from '@root/presentation/web-ui/appPath';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import {
	useVenueListArchivedQuery,
	useVenueListUnarchivedQuery,
} from '@root/presentation/web-ui/modules/venues/queries/venues.query';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { CategoryIcon } from '@root/presentation/web-ui/uiKit/categoryIcon/categoryIcon';

import styles from './venueListScreen.module.css';

export function VenueListScreen() {
	let intl = useIntl(venueListScreenI18n);
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
					{intl.translate('add')}
				</Button>
			</AppLink>

			<ul className={styles.venueList}>
				{venueList.map((venue) => (
					<li key={venue.id}>
						<AppLink
							className={styles.venueLink}
							to={EAppPath.VENUES_VIEW.replace(':id', venue.id)}
						>
							<div className={styles.venue}>
								<CategoryIcon>{venue.name?.[0]}</CategoryIcon>

								<div className={styles.meta}>
									<span className={styles.name}>{venue.name}</span>
									<span className={styles.category}>{venue.categoryName}</span>
								</div>
							</div>
						</AppLink>
					</li>
				))}

				{venueListArchived.map((venue) => (
					<li key={venue.id}>
						<AppLink
							className={styles.venueLink}
							to={EAppPath.VENUES_VIEW.replace(':id', venue.id)}
						>
							<div className={styles.venue}>
								<CategoryIcon>{venue.name?.[0]}</CategoryIcon>

								<div className={styles.meta}>
									<span className={styles.name}>{venue.name}</span>
									<span className={styles.category}>{venue.categoryName}</span>
								</div>
							</div>

							<span className={styles.badge}>{intl.translate('archived')}</span>
						</AppLink>
					</li>
				))}
			</ul>
		</>
	);
}
