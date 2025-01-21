import { EAppPath } from '@root/presentation/web-ui/appPath';
import { useVenueListQuery } from '@root/presentation/web-ui/modules/venues/venues.query';

import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { ScreenBody } from '@root/presentation/web-ui/uiKit/screen/screenBody';

import styles from './venueListScreen.module.css';

export function VenueListScreen() {
	let venueList = useVenueListQuery();

	return (
		<Screen>
			<Header title="Venues" />

			<ScreenBody>
				<AppLink to={EAppPath.VENUES_CREATE}>
					<Button onClick={() => {}} size="m" isWide>
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
			</ScreenBody>
		</Screen>
	);
}
