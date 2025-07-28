import {
	type QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

import { Id } from '@root/core/domain/types';
import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import type {
	TUserDTO,
	TUserUpdateDTO,
} from '@root/core/modules/user/application/dto/userDTO';

type TUserQueryType = 'one:id';

function createUserQuery(
	type: 'one:id',
	options: { id: Id },
): [TUserQueryType, Id];
function createUserQuery(type: TUserQueryType, options?: { id?: Id }) {
	switch (type) {
		case 'one:id':
			return ['user:one:id', options?.id];
		default: {
			let invalidType: never = type;
			throw new Error(`Unknown user query type: ${invalidType}`);
		}
	}
}

function invalidateUserOneByIdQuery({
	id,
	queryClient,
}: {
	id: Id;
	queryClient: QueryClient;
}) {
	return queryClient.invalidateQueries({
		queryKey: createUserQuery('one:id', {
			id,
		}),
	});
}

export function useUserOneByIdQuery() {
	let sessionService = resolveService(EServiceToken.SESSION_SERVICE);
	let userService = resolveService(EServiceToken.USER_SERVICE);

	let {
		data: user = {
			id: '',
			name: '',
			locale: ELocaleCode.RU_RU,
		},
	} = useQuery({
		queryKey: createUserQuery('one:id', {
			id: sessionService.userId,
		}),
		queryFn: () => {
			return userService.getUserById(sessionService.userId) as TUserDTO;
		},
	});

	return user;
}

export function useUserUpdateMutation(id: Id) {
	let queryClient = useQueryClient();
	let userService = resolveService(EServiceToken.USER_SERVICE);

	let { mutate: mutateUser } = useMutation({
		mutationFn: async (userUpdateDTO: TUserUpdateDTO) => {
			userService.updateUser(id, userUpdateDTO);
		},
		onSuccess: async () => {
			await invalidateUserOneByIdQuery({
				id,
				queryClient,
			});
		},
	});

	return mutateUser;
}
