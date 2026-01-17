import { venueListScreenI18n } from './venueListScreen.i18n';

import { EAppPath } from '@/presentation/web-ui/appPath';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import {
	useVenueListArchivedQuery,
	useVenueListUnarchivedQuery,
} from '@/presentation/web-ui/modules/venues/queries/venues.query';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Badge } from '@/presentation/web-ui/uiKit/badge/badge';
import { Card } from '@/presentation/web-ui/uiKit/card/card';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { ListIcon } from '@/presentation/web-ui/uiKit/list/list';
import {
	ValueAction,
	ValueActionLeading,
	ValueActionTrailing,
} from '@/presentation/web-ui/uiKit/valueAction/valueAction';

export function VenueListScreen() {
	let intl = useIntl(venueListScreenI18n);
	let venueList = useVenueListUnarchivedQuery();
	let venueListArchived = useVenueListArchivedQuery();

	return (
		<Stack>
			{venueList.map((venue) => (
				<Card key={venue.id} interactive asChild>
					<AppLink to={EAppPath.VENUES_VIEW.replace(':id', venue.id)}>
						<Stack row>
							<ListIcon>{venue.name?.[0]}</ListIcon>

							<ValueAction>
								<ValueActionLeading label={venue.name}>
									{venue.categoryName}
								</ValueActionLeading>
							</ValueAction>
						</Stack>
					</AppLink>
				</Card>
			))}

			{venueListArchived.map((venue) => (
				<Card key={venue.id} interactive asChild>
					<AppLink to={EAppPath.VENUES_VIEW.replace(':id', venue.id)}>
						<Stack row>
							<ListIcon>{venue.name?.[0]}</ListIcon>

							<ValueAction>
								<ValueActionLeading label={venue.name}>
									{venue.categoryName}
								</ValueActionLeading>

								<ValueActionTrailing>
									<Badge>{intl.translate('archived')}</Badge>
								</ValueActionTrailing>
							</ValueAction>
						</Stack>
					</AppLink>
				</Card>
			))}
		</Stack>
	);
}
