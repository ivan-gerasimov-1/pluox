import { useForm } from 'react-hook-form';

import { EServiceToken } from '@/core/infrastructure/serviceContainer/types';

import type { TVenueDTO } from '@/core/modules/venue/application/dto/venueDTO';

import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import { createVenueScreenI18n } from '@/presentation/web-ui/modules/venues/createVenue/createVenueScreen.i18n';
import { useVenueCreateMutation } from '@/presentation/web-ui/modules/venues/queries/venues.query';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import { Input } from '@/presentation/web-ui/uiKit/input/input';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { Paper } from '@/presentation/web-ui/uiKit/paper/paper';
import {
	ValueAction,
	ValueActionLeading,
} from '@/presentation/web-ui/uiKit/valueAction/valueAction';

export function CreateVenueScreen() {
	let navigation = useAppNavigation();
	let intl = useIntl(createVenueScreenI18n);

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
			<Paper asChild>
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
			</Paper>

			<Button type="submit" form="createVenueForm" wide>
				{intl.translate('add')}
			</Button>
		</Stack>
	);
}
