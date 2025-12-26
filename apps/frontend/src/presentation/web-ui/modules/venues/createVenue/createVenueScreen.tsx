import { useForm } from 'react-hook-form';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { createVenueScreenI18n } from '@root/presentation/web-ui/modules/venues/createVenue/createVenueScreen.i18n';
import { useVenueCreateMutation } from '@root/presentation/web-ui/modules/venues/queries/venues.query';

type TVenueFormData = {
	venueName: string;
	category: string;
};

export function CreateVenueScreen() {
	let navigation = useAppNavigation();
	let intl = useIntl(createVenueScreenI18n);
	let categoryQueryService = useService(EServiceToken.CATEGORY_QUERY_SERVICE);
	let categories = categoryQueryService.getAll();

	let {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TVenueFormData>();

	let venueCreateMutation = useVenueCreateMutation({
		onSuccess: (venueDto: TVenueDTO) => {
			navigation.venuePage(venueDto.id);
		},
	});

	const onSubmit = handleSubmit(async (venueData: TVenueFormData) => {
		venueCreateMutation.mutate({
			name: venueData.venueName,
			categoryId: venueData.category,
			isArchived: false,
		});
	});

	return (
		<form onSubmit={onSubmit}>
			<div>
				<input
					type="text"
					{...register('venueName', {
						required: intl.translate('required'),
					})}
				/>
				{errors.venueName && (
					<div className="text-red-600">{errors.venueName.message}</div>
				)}
			</div>

			<br />

			<div>
				<select {...register('category')}>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<br />

			<div>
				<button type="submit">{intl.translate('add')}</button>
			</div>
		</form>
	);
}
