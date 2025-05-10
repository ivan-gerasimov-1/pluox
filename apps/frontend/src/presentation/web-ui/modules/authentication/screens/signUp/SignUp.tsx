import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { usePending } from '@root/presentation/web-ui/hooks/usePending';

import { delay } from '@root/presentation/web-ui/utils/delay';

import styles from './signUp.module.css';

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
		<div className={styles.formContainer}>
			<h1>Pluox</h1>

			<h2>Создать аккаунт</h2>

			<form name="signIn" className={styles.signInForm} onSubmit={onSubmit}>
				<label htmlFor="email" className={styles.inputGroup}>
					<div className={styles.label}>Эл. почта</div>

					<input
						type="email"
						id="email"
						name="email"
						className={styles.inputField}
						autoComplete="email"
						autoFocus
					/>
				</label>

				<label htmlFor="password" className={styles.inputGroup}>
					<div className={styles.label}>Пароль</div>

					<input
						type="password"
						id="password"
						name="password"
						className={styles.inputField}
						autoComplete="current-password"
					/>
				</label>

				<div className={styles.inputGroup}>
					{pending ? (
						<div>Регистрация…</div>
					) : (
						<button type="submit" className={styles.submitButton}>
							Зарегистрироваться
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
