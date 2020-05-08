import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.mode';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListServic: ShoppingListService) { }

  ngOnInit(): void {
  }

  addNewIng(nameInput: string, amauntInput: number) {
    this.shoppingListServic.addIngredient(new Ingredient(nameInput, amauntInput));
  }

  clearShoppingList() {
    this.shoppingListServic.cleareList();
  }

  deleteIng() {
    this.shoppingListServic.deleteIngrediant();

  }

}
