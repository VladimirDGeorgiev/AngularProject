import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipeSelected: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => { this.recipeSelected = recipe;}
    );
  }
}
