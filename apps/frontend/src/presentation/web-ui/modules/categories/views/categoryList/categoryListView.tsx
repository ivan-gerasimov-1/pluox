import { EAppPath } from '@/presentation/web-ui/appPath';
import { useCategoryListQuery } from '@/presentation/web-ui/modules/categories/queries/categories.queries';
import { Grid, Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { ListIcon } from '@/presentation/web-ui/uiKit/list/list';
import { NavLink } from '@/presentation/web-ui/uiKit/navLink/navLink';
import { Sheet } from '@/presentation/web-ui/uiKit/sheet/sheet';
import { Title } from '@/presentation/web-ui/uiKit/title/title';

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
