import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  isActiveNavingredients: boolean = true;
  error: string = null;

  constructor(private recipeServer: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id']; //Take the id when he component is created , not on update
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeServer.getRecipeByIndex(this.id);
      }
    );
  }

  addIngredientsToShoppingList() {
    this.recipeServer.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    this.error = "Are you sure you want to delete the recipe! ";
    
  }

  onSelectIngredients() {
    this.isActiveNavingredients = true;
  }

  onSelectMethod() {
    this.isActiveNavingredients = false;
  }


  onCancalDelete() {
    this.error = null;
  }

  onConfirmDelete() {
    this.error = null;
    this.recipeServer.deleteRecipe(this.id).subscribe((recipe: Recipe[]) => {

      this.recipeServer.emitChanges();
      this.router.navigate(['/recipes']);
    })

  }


}
