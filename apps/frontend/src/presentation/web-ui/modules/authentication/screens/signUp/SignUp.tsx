import { EAppPath } from '@/presentation/web-ui/appPath';
import { useSignup } from '@/presentation/web-ui/modules/authentication/hooks/useSignup/useSignup';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import {
	Form,
	FormGroup,
	FormInput,
} from '@/presentation/web-ui/uiKit/form/form';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { Sheet } from '@/presentation/web-ui/uiKit/sheet/sheet';
import { Title } from '@/presentation/web-ui/uiKit/title/title';

export function SignUpScreen() {
	let { mutate: signup, isPending } = useSignup();

	return (
		<Sheet className="px-10 py-15 w-96 max-w-full" asChild>
			<Stack className="gap-10">
				<Title as="h1" className="text-2xl!">
					Pluox
				</Title>

				<Form name="signIn" onSubmit={signup}>
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

					<Button type="submit" disabled={isPending}>
						{isPending ? 'Регистрация…' : 'Зарегистрироваться'}
					</Button>
				</Form>

				<AppLink
					className="text-sm text-indigo-500! text-center"
					to={EAppPath.LOG_IN}
				>
					Войти
				</AppLink>
			</Stack>
		</Sheet>
	);
}
