import { EAppPath } from '@/presentation/web-ui/appPath';
import { useCategoryListQuery } from '@/presentation/web-ui/modules/categories/queries/categories.queries';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Grid, Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { ListIcon } from '@/presentation/web-ui/uiKit/list/list';
import { Sheet } from '@/presentation/web-ui/uiKit/sheet/sheet';
import { Title } from '@/presentation/web-ui/uiKit/title/title';

export function CategoryList() {
	let categories = useCategoryListQuery();

	return (
		<Grid>
			{categories.map((category) => (
				<Sheet key={category.id} interactive asChild>
					<Stack className="relative" asChild>
						<AppLink to={`${EAppPath.CATEGORIES}/${category.id}`}>
							<Title>{category.name}</Title>

							<ListIcon className="-right-0.5 -bottom-0.5 absolute">
								{category.icon ?? category.name[0]}
							</ListIcon>
						</AppLink>
					</Stack>
				</Sheet>
			))}
		</Grid>
	);
}
