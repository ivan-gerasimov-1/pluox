interface TailwindOptions {
	tailwindStylesheet: string;
	tailwindFunctions?: string[];
}

export function tailwind({
	tailwindStylesheet,
	tailwindFunctions = ['cn', 'cva'],
}: TailwindOptions) {
	return {
		plugins: ['prettier-plugin-tailwindcss'],
		tailwindStylesheet,
		tailwindFunctions,
	};
}
