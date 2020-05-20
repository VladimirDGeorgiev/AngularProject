import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.fetchRecipe().subscribe(
      (recipes: Recipe[]) => (
        this.recipes = recipes
        // this.recipeService.emitChanges()
      )
    );
    // this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription = this.recipeService.recipeChange
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }
  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }
}
