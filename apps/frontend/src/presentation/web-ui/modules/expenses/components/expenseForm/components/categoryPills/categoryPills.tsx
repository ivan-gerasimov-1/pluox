import { useMemo } from 'react';

import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import { PillsSelect } from '@root/presentation/web-ui/uiKit/pillsSelect/pillsSelect';

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
		[],
	);

	return (
		<PillsSelect
			value={props.value}
			items={categories}
			onSelect={(payload) => props.onSelect(payload?.id)}
		/>
	);
}
