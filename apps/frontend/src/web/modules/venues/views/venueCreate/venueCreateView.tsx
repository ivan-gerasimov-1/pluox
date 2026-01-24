import { EServiceToken } from '@core/infrastructure/serviceContainer/types';
import type { TVenueDTO } from '@core/modules/venue/application/dto/venueDTO';
import { useForm } from 'react-hook-form';

import { useAppNavigation } from '@/web/hooks/useNavigation';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { useService } from '@/web/modules/serviceContainer/useService';
import { useVenueCreateMutation } from '@/web/modules/venues/queries/venues.query';
import { venueCreateViewI18n } from '@/web/modules/venues/views/venueCreate/venueCreateView.i18n';
import { Button } from '@/web/uiKit/button/button';
import { Input } from '@/web/uiKit/input/input';
import { Stack } from '@/web/uiKit/layout/layout';
import { Sheet } from '@/web/uiKit/sheet/sheet';
import {
	ValueAction,
	ValueActionLeading,
} from '@/web/uiKit/valueAction/valueAction';

export function VenueCreateView() {
	let navigation = useAppNavigation();
	let intl = useIntl(venueCreateViewI18n);

	let categoryQueryService = useService(EServiceToken.CATEGORY_QUERY_SERVICE);
	let categories = categoryQueryService.getAll();

	let {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{
		venueName: string;
		category: string;
	}>();

	let venueCreateMutation = useVenueCreateMutation({
		onSuccess: (venueDto: TVenueDTO) => {
			navigation.venuePage(venueDto.id);
		},
	});

	const onSubmit = handleSubmit((venueData) => {
		venueCreateMutation.mutate({
			name: venueData.venueName,
			categoryId: venueData.category,
			isArchived: false,
		});
	});

	return (
		<Stack>
			<Sheet asChild>
				<form id="createVenueForm" onSubmit={onSubmit}>
					<ValueAction>
						<ValueActionLeading
							className="gap-2"
							label={intl.translate('venueName')}
						>
							<Input
								type="text"
								{...register('venueName', {
									required: intl.translate('required'),
								})}
							/>

							{errors.venueName && (
								<div className="ml-2 mt-1 text-red-600">
									{errors.venueName.message}
								</div>
							)}
						</ValueActionLeading>
					</ValueAction>

					<ValueAction>
						<ValueActionLeading
							className="gap-2"
							label={intl.translate('category')}
						>
							<Input asChild>
								<select {...register('category')}>
									{categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</Input>
						</ValueActionLeading>
					</ValueAction>
				</form>
			</Sheet>

			<Button type="submit" form="createVenueForm" wide>
				{intl.translate('add')}
			</Button>
		</Stack>
	);
}
