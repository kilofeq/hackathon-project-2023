import { Animal } from "@/app/api/enums/animalEnum";

export type EnumDictionary<T extends string | symbol | number, U> = {
	[K in T]: U;
};

export type Nullable<T> = T | null;

export enum Color {
	RED = "#C1121F",
	DARK_RED = "#780000",
	GREEN = "#007830",
	DARK_BLUR = "#003049",
	BLUR = "#669BBC",
	BEIGE = "#FDF0D5",
	BLACK = "#1B1B1B",
	WHITE = "#FFFFFF",
	GRAY = "#616161",
}

export enum InputType {
	TEXT = "text",
	NUMBER = "number",
	PASSWORD = "password"
}

export interface IReport {
    name: string,
    photos: Nullable<string[]>,
    latitude: number,
    longitude: number,
    user_ids: string[],
    danger: boolean,
    animal: Animal
}

export type StateConfig<T> = {
	value: Nullable<T>,
	isOpen: boolean
}
