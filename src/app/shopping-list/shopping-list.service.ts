import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.mode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>();
  selectedIng = new Subject<number>();
  private ingredients: Ingredient[];

  constructor() {
    this.ingredients = [
      new Ingredient(`Apples`, 5),
      new Ingredient(`Tomato`, 10)
    ];
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
