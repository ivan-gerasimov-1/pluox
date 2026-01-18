import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { Button } from '@/presentation/web-ui/uiKit/button/button';

export function NavButton({
	to,
	wide,
	children,
}: React.PropsWithChildren<{
	to: 'venueCreatePage';
	wide?: boolean;
}>) {
	let navigate = useAppNavigation();

	return (
		<Button onClick={navigate[to]} wide={wide}>
			{children}
		</Button>
	);
}
