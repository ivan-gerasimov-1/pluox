import { useMemo } from 'react';

import { EServiceToken } from '@/presentation/web/modules/serviceContainer/enums';
import { useService } from '@/presentation/web/modules/serviceContainer/useService';
import { PillsSelect } from '@/presentation/web/uiKit/pillsSelect/pillsSelect';

type TCategoryPillsProps = {
	value?: string | null;

	onSelect(categoryId?: string): void;
};

export function CategoryPills(props: TCategoryPillsProps) {
	let categoryQueryService = useService(EServiceToken.CATEGORY_QUERY_SERVICE);
	let categories = useMemo(
		() =>
			categoryQueryService.getAll({
				useWeights: true,
			}),
		[categoryQueryService],
	);

	return (
		<PillsSelect
			value={props.value}
			items={categories}
			onSelect={(payload) => props.onSelect(payload?.id)}
		/>
	);
}
