import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.mode';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 private recipes: Recipe[] = [
   new Recipe(`Kavarma`, `This is a recipe 1`, `https://recepti.ezine.bg/files/lib/500x350/pileshka-kavarma-tigan.jpg`,
    [new Ingredient('Kompiri', 5),
     new Ingredient('Morkovi', 2)
    ]),
   new Recipe(`Shopska Salata`, `This is a recipe 2`, `https://recepti.gotvach.bg/files/lib/500x350/shopska-salata.jpg`,
      [new Ingredient('Domati', 5),
        new Ingredient('Krastavici', 2)
      ])
  ];

  constructor(private shoppingListServer: ShoppingListService) { }

  getRecipe(){
    return this.recipes.slice();
  }

  getRecipeByIndex(index: number){
    return this.recipes[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListServer.addIngredients(ingredients);
  }
}
