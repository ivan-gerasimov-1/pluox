import { EAppPath } from '@/presentation/web-ui/appPath';
import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { usePending } from '@/presentation/web-ui/hooks/usePending';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import { Input } from '@/presentation/web-ui/uiKit/input/input';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
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
		<Stack className="gap-10 px-10 py-15 w-96 rounded-3xl border-gray-200/50 bg-white max-w-full border shadow-(--box-shadow-100)">
			<h1 className="text-2xl font-semibold">Pluox</h1>

			<Stack asChild>
				<form name="signIn" className="gap-5" onSubmit={onSubmit}>
					<label htmlFor="email" className="*:mt-3 flex flex-col">
						<div className="text-sm font-semibold mt-0!">Эл. почта</div>

						<Input
							type="email"
							id="email"
							name="email"
							autoComplete="email"
							autoFocus
						/>
					</label>

					<label htmlFor="password" className="*:mt-3 flex flex-col">
						<div className="text-sm font-semibold mt-0!">Пароль</div>

						<Input
							type="password"
							id="password"
							name="password"
							autoComplete="current-password"
						/>
					</label>

					<div>
						{pending ? (
							<div className="text-sm text-center">Регистрация…</div>
						) : (
							<Button type="submit" wide>
								Зарегистрироваться
							</Button>
						)}
					</div>
				</form>
			</Stack>

			<Stack className="gap-1! text-sm flex-row items-center justify-center">
				Есть аккаунт?
				<AppLink className="text-indigo-600" to={EAppPath.LOG_IN}>
					Войти
				</AppLink>
			</Stack>
		</Stack>
	);
}
