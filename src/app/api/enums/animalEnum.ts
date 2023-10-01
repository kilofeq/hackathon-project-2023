export enum Animal{
    Dog="Dog",
    Fox="Fox",
    Boar="Boar"
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
    }
}