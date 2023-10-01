export enum Animal{
    Dog="Dog",
    Fox="Fox",
    Boar="Boar",
    Chicken="Chicken",
    Pig="Pig",
    Cat="Cat"
}

export const animalValues = Object.values(Animal);

export const dangerOfAnimal = (animal: Animal) => {
    switch(animal){
        case Animal.Fox: 
            return true;
        case Animal.Boar: 
            return true;
        case Animal.Dog:
            return false;
        case Animal.Chicken:
            return false;
        case Animal.Pig:
            return false;
        case Animal.Cat:
            return false;
    }
}