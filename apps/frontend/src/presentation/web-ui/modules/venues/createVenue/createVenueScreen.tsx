import { useForm } from 'react-hook-form';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';

import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';

import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { createVenueScreenI18n } from '@root/presentation/web-ui/modules/venues/createVenue/createVenueScreen.i18n';
import { useVenueCreateMutation } from '@root/presentation/web-ui/modules/venues/queries/venues.query';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Card } from '@root/presentation/web-ui/uiKit/card/card';
import { CardContainer } from '@root/presentation/web-ui/uiKit/cardContainer/cardContainer';
import {
	ValueAction,
	ValueActionContent,
	ValueActionLabel,
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
							<ValueActionLeading>
								<ValueActionLabel>
									{intl.translate('venueName')}
								</ValueActionLabel>

								<ValueActionContent className="mt-1">
									<input
										type="text"
										className="px-4 py-3 border-neutral-200/50 rounded-2xl text-sm w-full border font-[inherit] text-inherit"
										{...register('venueName', {
											required: intl.translate('required'),
										})}
									/>

									{errors.venueName && (
										<div className="ml-2 mt-1 text-red-600">
											{errors.venueName.message}
										</div>
									)}
								</ValueActionContent>
							</ValueActionLeading>
						</ValueAction>

						<ValueAction>
							<ValueActionLeading>
								<ValueActionLabel>
									{intl.translate('category')}
								</ValueActionLabel>

								<ValueActionContent className="mt-1">
									<select
										{...register('category')}
										className="px-4 py-3 border-neutral-200/50 rounded-2xl text-sm w-full appearance-none border font-[inherit] text-inherit"
									>
										{categories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
								</ValueActionContent>
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
