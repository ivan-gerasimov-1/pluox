import { EAppPath } from '@/presentation/web-ui/appPath';
import { useCategoryListQuery } from '@/presentation/web-ui/modules/categories/queries/categories.queries';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Card } from '@/presentation/web-ui/uiKit/card/card';
import { Grid, Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { ListIcon } from '@/presentation/web-ui/uiKit/list/list';
import {
	ValueAction,
	ValueActionLeading,
} from '@/presentation/web-ui/uiKit/valueAction/valueAction';

export function CategoryList() {
	let categories = useCategoryListQuery();

	return (
		<Grid>
			{categories.map((category) => (
				<Card key={category.id} interactive asChild>
					<Stack row asChild>
						<AppLink to={`${EAppPath.CATEGORIES}/${category.id}`}>
							<ListIcon>{category.icon ?? category.name[0]}</ListIcon>

							<ValueAction>
								<ValueActionLeading label={category.name} />
							</ValueAction>
						</AppLink>
					</Stack>
				</Card>
			))}
		</Grid>
	);
}
