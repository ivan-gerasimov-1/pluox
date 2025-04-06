import { useMatches } from 'react-router';

export function useScreenMeta(): {
	title?: string;
	TitleComponent?: React.ComponentType;
	hasNavbar?: boolean;
} {
	let matches = useMatches();
	let meta: {
		title?: string;
		TitleComponent?: React.ComponentType;
		hasNavbar?: boolean;
	} = matches.at(-1)?.handle as {
		title: string;
		TitleComponent?: React.ComponentType;
		hasNavbar?: boolean;
	};

	return meta;
}
