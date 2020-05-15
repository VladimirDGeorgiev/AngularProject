import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.mode';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChange = new Subject<Recipe[]>();
  url: string = 'https://recipe-c1784.firebaseio.com/';

  private recipes: Recipe[] = [];

  constructor(
    private shoppingListServer: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService) {
  }

  storeRecipe() {

    this.http.put(this.url + 'recipes.json', this.recipes)
      .subscribe((response) => (console.log(response))
      )
  }

  fetchRecipe() {
    return this.http.get<Recipe[]>(this.url + 'recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          })
        }), tap(response => (
          this.recipes = response
        )))


  }


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.emitChanges();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.emitChanges();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListServer.addIngredients(ingredients);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.emitChanges();
  }

  emitChanges() {
    this.recipeChange.next(this.recipes.slice());
  }
}
