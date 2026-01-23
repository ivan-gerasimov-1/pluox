declare module '*.module.css' {
	interface IClassNames {
		[className: string]: string;
	}

	const classNames: IClassNames;

	export = classNames;
}

// declare module '*.svg' {
// 	const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
// 	export default value;
// }
