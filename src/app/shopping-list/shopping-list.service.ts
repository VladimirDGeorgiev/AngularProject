import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>();
  selectedIng = new Subject<number>();
  private ingredients: Ingredient[];

  constructor() {
    this.ingredients = [new Ingredient("Яйца", 6, "бр"), new Ingredient("Домати", 2, "kg"), new Ingredient("Масло", 500, "g"),];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.emitChanges();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.emitChanges();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.emitChanges()
  }


  delete(index: number) {
    this.ingredientChange.next(this.ingredients.splice(index, 1));
    this.emitChanges();
  }

  private emitChanges() {
    this.ingredientChange.next(this.ingredients.slice());
  }
}
