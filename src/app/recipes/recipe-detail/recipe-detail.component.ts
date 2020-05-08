import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(private recipeServer: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id']; //Take the id when he component is created , not on update
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeServer.getRecipeByIndex(this.id);
      }
    );
  }

  addIngredients() {
    this.recipeServer.addIngredients(this.recipe.ingredients);
  }

}
