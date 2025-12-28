export function CardContainer(props: React.PropsWithChildren<{}>) {
	return <div className="gap-5 flex flex-col">{props.children}</div>;
}
