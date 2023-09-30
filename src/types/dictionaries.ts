import { EnumDictionary } from "@/types/util.types";
import { Animal } from "@/app/api/enums/animalEnum";

export const animalToAnimalNameDictionary: EnumDictionary<Animal, string> = {
	[ Animal.Dog ]: "Pies",
	[ Animal.Fox ]: "Lis",
	[ Animal.Boar ]: "Dzik",
}

export const animalToAnimalEmojiDictionary: EnumDictionary<Animal, string> = {
	[ Animal.Dog ]: "🐶",
	[ Animal.Fox ]: "🦊",
	[ Animal.Boar ]: "🐗",
}