import { EAppPath } from '@/web/appPath';

import { useLogin } from '@/web/modules/authentication/hooks/useLogin/useLogin';

import { Button } from '@kit/button/button';
import { Form, FormGroup, FormInput } from '@kit/form/form';
import { Stack } from '@kit/layout/layout';
import { NavLink } from '@kit/navLink/navLink';
import { Sheet } from '@kit/sheet/sheet';
import { Title } from '@kit/title/title';

export function LogInView() {
	let { mutate: login, isPending } = useLogin();

	return (
		<Sheet className="px-10 py-15 w-96 max-w-full" asChild>
			<Stack className="gap-10">
				<Title className="text-2xl!" as="h1">
					Pluox
				</Title>

				<Form name="signIn" onSubmit={login}>
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

						<NavLink
							className="text-sm text-indigo-500! text-right"
							to={EAppPath.SIGN_UP}
						>
							Забыли пароль?
						</NavLink>
					</FormGroup>

					<Button type="submit" disabled={isPending}>
						{isPending ? 'Загрузка…' : 'Войти'}
					</Button>
				</Form>

				<NavLink
					className="text-sm text-indigo-500! text-center"
					to={EAppPath.SIGN_UP}
				>
					Создать аккаунт
				</NavLink>
			</Stack>
		</Sheet>
	);
}
