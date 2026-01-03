import { EAppPath } from '@root/presentation/web-ui/appPath';
import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { usePending } from '@root/presentation/web-ui/hooks/usePending';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { Input } from '@root/presentation/web-ui/uiKit/input/input';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { delay } from '@root/presentation/web-ui/utils/delay';

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
		<Screen>
			<div className="gap-10 px-10 py-15 w-96 rounded-3xl border-neutral-200/50 m-auto flex max-w-full flex-col justify-center border shadow-[var(--box-shadow-100)]">
				<h1 className="text-2xl font-semibold">Pluox</h1>

				<form name="signIn" className="gap-5 flex flex-col" onSubmit={onSubmit}>
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
							<Button type="submit" isWide>
								Зарегистрироваться
							</Button>
						)}
					</div>
				</form>

				<div className="gap-1 text-sm flex items-center justify-center">
					Есть аккаунт?
					<AppLink className="text-indigo-600" to={EAppPath.LOG_IN}>
						Войти
					</AppLink>
				</div>
			</div>
		</Screen>
	);
}
