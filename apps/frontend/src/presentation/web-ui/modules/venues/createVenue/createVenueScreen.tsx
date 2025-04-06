import { useForm } from 'react-hook-form';

import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

type TVenueFormData = {
	venueName: string;
	category: string;
};

export function CreateVenueScreen() {
	let categoryQueryService = useService(EServiceToken.CATEGORY_QUERY_SERVICE);
	let categories = categoryQueryService.getAll();

	let venueUseCase = useService(EServiceToken.VENUE_USE_CASE);

	let {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TVenueFormData>();

	const onSubmit = handleSubmit(async (venueData: TVenueFormData) => {
		venueUseCase.create({
			name: venueData.venueName,
			categoryId: venueData.category,
		});
	});

	return (
		<form onSubmit={onSubmit}>
			<div>
				<input
					type="text"
					{...register('venueName', {
						required: 'Обязательно',
					})}
				/>
				{errors.venueName && (
					<div
						style={{
							color: 'red',
						}}
					>
						{errors.venueName.message}
					</div>
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
				<button type="submit">Добавить</button>
			</div>
		</form>
	);
}
