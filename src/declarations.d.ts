declare module '*.module.css' {
	interface IClassNames {
		[className: string]: string;
	}

	const classNames: IClassNames;

	export = classNames;
}

declare const module: {
	hot: {
		accept: Function;
	};
};

declare module '*.svg' {
	const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
	export default value;
}
