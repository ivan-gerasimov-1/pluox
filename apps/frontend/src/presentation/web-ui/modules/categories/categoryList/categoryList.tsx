import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useCategoryListQuery } from '@root/presentation/web-ui/modules/categories/queries/categories.queries';
import { CategoryIcon } from '@root/presentation/web-ui/uiKit/categoryIcon/categoryIcon';
import { cls } from '@root/presentation/web-ui/utils/classnames';

export function CategoryList() {
	let navigate = useAppNavigation();
	let categories = useCategoryListQuery();

	return (
		<ul className="gap-2.5 m-0 p-0 flex list-none flex-col">
			{categories.map((category) => (
				<li key={category.id}>
					<button
						type="button"
						className={cls(
							'gap-4 p-4 flex w-full items-center justify-start',
							'rounded-2xl border-neutral-200/50 border',
							'bg-white shadow-(--box-shadow-90)',
							'transition',
							'hover:border-neutral-200 hover:-translate-y-px hover:shadow-(--box-shadow-100)',
							'active:shadow-(--box-shadow-90)',
							'focus-visible:border-neutral-900 focus-visible:outline-none',
						)}
						onClick={() => navigate.categoryPage(category.id)}
					>
						<CategoryIcon>{category.icon ?? category.name[0]}</CategoryIcon>

						<span className="text-sm font-normal text-neutral-800 overflow-hidden text-ellipsis whitespace-nowrap">
							{category.name}
						</span>
					</button>
				</li>
			))}
		</ul>
	);
}
