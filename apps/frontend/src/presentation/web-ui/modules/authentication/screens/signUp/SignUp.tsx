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

export function SignUpScreen() {
	let authService = useService(EServiceToken.AUTH_SERVICE);

	const navigation = useAppNavigation();
	const { pending, setPending } = usePending();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		/** @todo Remove @ts-expect-error */
		// @ts-expect-error | Use proper types
		const formElements = event.target.elements;

		const email = formElements.email.value;
		const password = formElements.password.value;

		try {
			setPending(true);

			await authService.signUp(email, password);
			navigation.loginPage();
		} finally {
			await delay(500);
			setPending(false);
		}
	}

	return (
		<Paper className="px-10 py-15 w-96 max-w-full" asChild>
			<Stack className="gap-10">
				<Title as="h1" className="text-2xl!">
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

					<FormGroup>
						<FormInput
							type="password"
							name="password"
							label="Пароль"
							autoComplete="new-password"
							required
						/>
					</FormGroup>

					<Button type="submit" disabled={pending}>
						{pending ? 'Регистрация…' : 'Зарегистрироваться'}
					</Button>
				</Form>

				<AppLink
					className="text-sm text-indigo-500! text-center"
					to={EAppPath.LOG_IN}
				>
					Войти
				</AppLink>
			</Stack>
		</Paper>
	);
}
