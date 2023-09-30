import { EnumDictionary } from "@/types/util.types";
import { Animal } from "@/app/api/enums/animalEnum";

// export const colorToHexDictionary: EnumDictionary<Color, string> = {
// 	[ Color.RED ]: "#C1121F",
// 	[ Color.DARK_RED ]: "#780000",
// 	[ Color.GREEN ]: "#007830",
// 	[ Color.DARK_BLUR ]: "#003049",
// 	[ Color.BLUR ]: "#669BBC",
// 	[ Color.BEIGE ]: "#FDF0D5",
// 	[ Color.BLACK ]: "#1B1B1B",
// 	[ Color.WHITE ]: "#FFFFFF",
// }

export const animalToAnimalNameDictionary: EnumDictionary<Animal, string> = {
	[ Animal.Dog ]: "Pies",
	[ Animal.Fox ]: "Lis",
	[ Animal.Boar ]: "Dzik",
}