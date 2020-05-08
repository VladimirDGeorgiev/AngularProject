import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.mode';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChange.subscribe(
      (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
    );
  }

  selectedIngredient(i: number) {
    this.shoppingListService.selectedIng = i;
  }

}
