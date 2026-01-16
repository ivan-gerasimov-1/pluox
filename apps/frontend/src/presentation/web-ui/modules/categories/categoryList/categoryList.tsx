import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { useCategoryListQuery } from '@/presentation/web-ui/modules/categories/queries/categories.queries';
import { Grid } from '@/presentation/web-ui/uiKit/layout/layout';
import { ListIcon, ListItem } from '@/presentation/web-ui/uiKit/list/list';
import {
	ValueAction,
	ValueActionLeading,
} from '@/presentation/web-ui/uiKit/valueAction/valueAction';

export function CategoryList() {
	let navigate = useAppNavigation();
	let categories = useCategoryListQuery();

	return (
		<Grid>
			{categories.map((category) => (
				<ListItem key={category.id} asChild>
					<button
						type="button"
						onClick={() => navigate.categoryPage(category.id)}
					>
						<ListIcon>{category.icon ?? category.name[0]}</ListIcon>

						<ValueAction>
							<ValueActionLeading label={category.name} />
						</ValueAction>
					</button>
				</ListItem>
			))}
		</Grid>
	);
}
