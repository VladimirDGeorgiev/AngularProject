import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.mode';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListServic: ShoppingListService) { }
  @ViewChild('f') slForm: NgForm;
  ngOnInit(): void {
    this.subscription = this.shoppingListServic.selectedIng.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editItem = this.shoppingListServic.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amaunt: this.editItem.amaunt
        })
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

  addNewIng(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amaunt)

    if (this.editMode) {
      this.shoppingListServic.updateIngredient(this.editItemIndex, newIngredient);
      
    } else {
      this.shoppingListServic.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.slForm.reset();

  }

  clearShoppingList() {
    this.editMode = false;
    this.slForm.reset();
  }

  deleteIng() {
    
        this.shoppingListServic.delete(this.editItemIndex);
      
    this.slForm.reset();

  }

}
