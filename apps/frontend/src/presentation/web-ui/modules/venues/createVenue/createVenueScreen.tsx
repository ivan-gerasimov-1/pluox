import { useForm } from 'react-hook-form';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { createVenueScreenI18n } from '@root/presentation/web-ui/modules/venues/createVenue/createVenueScreen.i18n';
import { useVenueCreateMutation } from '@root/presentation/web-ui/modules/venues/queries/venues.query';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Card, CardContainer } from '@root/presentation/web-ui/uiKit/card/card';
import { Input } from '@root/presentation/web-ui/uiKit/input/input';
import {
	ValueAction,
	ValueActionLeading,
} from '@root/presentation/web-ui/uiKit/valueAction/valueAction';

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
		<>
			<CardContainer>
				<Card>
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
								className="mt-1"
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
				</Card>
			</CardContainer>

			<Button type="submit" form="createVenueForm" isWide>
				{intl.translate('add')}
			</Button>
		</>
	);
}
