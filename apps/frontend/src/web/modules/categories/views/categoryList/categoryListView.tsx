import { EAppPath } from '@/web/appPath';

import { useCategoryListQuery } from '@/web/modules/categories/queries/categories.queries';

import { Grid, Stack } from '@kit/layout/layout';
import { ListIcon } from '@kit/list/list';
import { NavLink } from '@kit/navLink/navLink';
import { Sheet } from '@kit/sheet/sheet';
import { Title } from '@kit/title/title';

export function CategoryListView() {
	let categories = useCategoryListQuery();

	return (
		<Grid>
			{categories.map((category) => (
				<Sheet key={category.id} interactive asChild>
					<Stack className="relative" asChild>
						<NavLink to={`${EAppPath.CATEGORIES}/${category.id}`}>
							<Title>{category.name}</Title>

							<ListIcon className="-right-0.5 -bottom-0.5 absolute">
								{category.icon ?? category.name[0]}
							</ListIcon>
						</NavLink>
					</Stack>
				</Sheet>
			))}
		</Grid>
	);
}
