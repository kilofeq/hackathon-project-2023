export type EnumDictionary<T extends string | symbol | number, U> = {
	[K in T]: U;
};

export enum Color {
	RED = "#C1121F",
	DARK_RED = "#780000",
	GREEN = "#007830",
	DARK_BLUR = "#003049",
	BLUR = "#669BBC",
	BEIGE = "#FDF0D5",
	BLACK = "#1B1B1B",
	WHITE = "#FFFFFF",
}