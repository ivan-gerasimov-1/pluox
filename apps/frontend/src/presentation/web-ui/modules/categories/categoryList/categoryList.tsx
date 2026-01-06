import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useCategoryListQuery } from '@root/presentation/web-ui/modules/categories/queries/categories.queries';
import {
	List,
	ListIcon,
	ListItem,
} from '@root/presentation/web-ui/uiKit/list/list';
import {
	ValueAction,
	ValueActionLeading,
} from '@root/presentation/web-ui/uiKit/valueAction/valueAction';

export function CategoryList() {
	let navigate = useAppNavigation();
	let categories = useCategoryListQuery();

	return (
		<List>
			{categories.map((category) => (
				<ListItem key={category.id} asChild>
					<button
						type="button"
						onClick={() => navigate.categoryPage(category.id)}
					>
						<ListIcon>{category.icon ?? category.name[0]}</ListIcon>

						<ValueAction>
							<ValueActionLeading label={category.name}>Asd</ValueActionLeading>
						</ValueAction>
					</button>
				</ListItem>
			))}
		</List>
	);
}
