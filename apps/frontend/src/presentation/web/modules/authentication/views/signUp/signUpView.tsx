import { EAppPath } from '@/presentation/web/appPath';
import { useSignup } from '@/presentation/web/modules/authentication/hooks/useSignup/useSignup';
import { Button } from '@/presentation/web/uiKit/button/button';
import {
	Form,
	FormGroup,
	FormInput,
} from '@/presentation/web/uiKit/form/form';
import { Stack } from '@/presentation/web/uiKit/layout/layout';
import { NavLink } from '@/presentation/web/uiKit/navLink/navLink';
import { Sheet } from '@/presentation/web/uiKit/sheet/sheet';
import { Title } from '@/presentation/web/uiKit/title/title';

export function SignUpView() {
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

				<NavLink
					className="text-sm text-indigo-500! text-center"
					to={EAppPath.LOG_IN}
				>
					Войти
				</NavLink>
			</Stack>
		</Sheet>
	);
}
