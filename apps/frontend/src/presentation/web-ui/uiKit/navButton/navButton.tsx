import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { Button } from '@/presentation/web-ui/uiKit/button/button';

export function NavButton({
	className,
	to,
	wide,
	children,
}: React.PropsWithChildren<{
	className?: string;
	to: 'loginPage' | 'mainPage' | 'dashboardPage' | 'venueCreatePage';
	wide?: boolean;
}>) {
	let navigate = useAppNavigation();

	return (
		<Button className={className} onClick={navigate[to]} wide={wide}>
			{children}
		</Button>
	);
}
