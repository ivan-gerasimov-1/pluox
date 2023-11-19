import styles from './signIn.module.css';

export function SignIn() {
	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
	}

	return (
		<div className={styles.formContainer}>
			<h1>Savee</h1>

			<form name="signIn" className={styles.signInForm} onSubmit={onSubmit}>
				<label htmlFor="email" className={styles.inputGroup}>
					<div className={styles.label}>Имейл</div>

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
					<button type="submit" className={styles.submitButton}>
						Войти
					</button>
				</div>
			</form>
		</div>
	);
}
