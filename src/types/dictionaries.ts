import { EnumDictionary } from "@/types/util.types";
import { Animal } from "@/app/api/enums/animalEnum";

export const animalToAnimalNameDictionary: EnumDictionary<Animal, string> = {
	[ Animal.Dog ]: "Pies",
	[ Animal.Fox ]: "Lis",
	[ Animal.Boar ]: "Dzik",
	[Animal.Chicken]: "Kurczak",
	[Animal.Pig]: "Świnia",
	[Animal.Cat]: "Kot",
}

export const animalToAnimalEmojiDictionary: EnumDictionary<Animal, string> = {
	[ Animal.Dog ]: "🐶",
	[ Animal.Fox ]: "🦊",
	[ Animal.Boar ]: "🐗",
	[Animal.Chicken]: "🐔",
	[Animal.Pig]: "🐷",
	[Animal.Cat]: "🐱",
}