import { EAppPath } from '@/presentation/web-ui/appPath';
import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { usePending } from '@/presentation/web-ui/hooks/usePending';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import {
	Form,
	FormGroup,
	FormInput,
} from '@/presentation/web-ui/uiKit/form/form';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { Paper } from '@/presentation/web-ui/uiKit/paper/paper';
import { Title } from '@/presentation/web-ui/uiKit/title/title';
import { delay } from '@/presentation/web-ui/utils/delay';

export function useLoginForm() {
	let authService = useService(EServiceToken.AUTH_SERVICE);
	let navigation = useAppNavigation();

	let { pending, setPending } = usePending();

	async function onSubmit(payload: {
		email: {
			value: string;
		};
		password: {
			value: string;
		};
	}) {
		let email = payload.email.value;
		let password = payload.password.value;

		try {
			setPending(true);

			await authService.logIn(email, password);

			navigation.mainPage();
		} finally {
			await delay(500);

			setPending(false);
		}
	}

	return {
		pending,
		onSubmit,
	};
}

export function LogInForm() {
	let { onSubmit, pending } = useLoginForm();

	return (
		<Paper className="px-10 py-15 w-96 max-w-full" asChild>
			<Stack className="gap-10">
				<Title className="text-2xl!" as="h1">
					Pluox
				</Title>

				<Form name="signIn" onSubmit={onSubmit}>
					<FormGroup>
						<FormInput
							type="email"
							name="email"
							label="Почта"
							autoComplete="email"
							autoFocus
							required
						/>
					</FormGroup>

					<FormGroup className="gap-2!">
						<FormInput
							type="password"
							name="password"
							label="Пароль"
							autoComplete="current-password"
							required
						/>

						<AppLink
							className="text-sm text-indigo-500! text-right"
							to={EAppPath.SIGN_UP}
						>
							Забыли пароль?
						</AppLink>
					</FormGroup>

					<Button type="submit" disabled={pending}>
						{pending ? 'Загрузка…' : 'Войти'}
					</Button>
				</Form>

				<AppLink
					className="text-sm text-indigo-500! text-center"
					to={EAppPath.SIGN_UP}
				>
					Создать аккаунт
				</AppLink>
			</Stack>
		</Paper>
	);
}
