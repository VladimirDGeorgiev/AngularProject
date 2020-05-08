import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.mode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>();
  selectedIng: number;
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

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.emitChanges();
  }

  cleareList() {
    this.ingredients = [];
    this.emitChanges();
  }

  deleteIngrediant() {
    if (this.ingredients.length !== 0 && this.selectedIng >= 0 && this.selectedIng < this.ingredients.length) {
      this.ingredients.splice(this.selectedIng, 1);
    }
    this.selectedIng = -1;

    this.emitChanges();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.emitChanges();
  }


  emitChanges() {
    this.ingredientChange.next(this.ingredients.slice());
  }
}
