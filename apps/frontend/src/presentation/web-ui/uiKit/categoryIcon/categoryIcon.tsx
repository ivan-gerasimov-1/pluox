import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

export type TCategoryIconProps = {
	categoryId: string | null;
	onClick?: () => void;
};

export function CategoryIcon(props: TCategoryIconProps) {
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	return (
		<span
			className="rounded-ss-xl rounded-se-md rounded-es-md rounded-ee-2xl text-2xl bg-neutral-100 rounded flex h-[50px] w-[50px] items-center justify-center select-none"
			onClick={props.onClick}
		>
			{categoryService.getCategoryIcon(props.categoryId)}
		</span>
	);
}
