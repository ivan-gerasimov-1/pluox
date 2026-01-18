import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { Button } from '@/presentation/web-ui/uiKit/button/button';

type TNavButtonProps = {
	className?: string;

	to: 'loginPage' | 'mainPage' | 'dashboardPage' | 'venueCreatePage';
	wide?: boolean;
};

export function NavButton({
	className,
	to,
	wide,
	children,
}: React.PropsWithChildren<TNavButtonProps>) {
	let navigate = useAppNavigation();

	return (
		<Button className={className} onClick={navigate[to]} wide={wide}>
			{children}
		</Button>
	);
}
