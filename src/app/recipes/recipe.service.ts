import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  //localStorage.setItem('userData')
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
          if (recipes === null) {
            return [];
          }
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [], steps: recipe.steps ? recipe.steps : [] }
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
    let userId =JSON.parse(localStorage.getItem("userData")).id
    this.recipes.push(recipe);
    return this.http.put(this.url +userId+"/"+ 'recipes.json', this.recipes)
    this.emitChanges();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    let userId =JSON.parse(localStorage.getItem("userData")).id
    this.recipes[index] = newRecipe;
    return this.http.put(this.url + 'recipes.json', this.recipes)
    this.emitChanges();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListServer.addIngredients(ingredients);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    return this.http.put(this.url + 'recipes.json', this.recipes)
  }

  emitChanges() {
    this.recipeChange.next(this.recipes.slice());
  }
}
