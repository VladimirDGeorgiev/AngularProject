import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class User {
    constructor(public username: string, public recipes: Recipe[], public shoppingList: Ingredient[]) {

    }
}