import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private recipeService: RecipeService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> {
        const recipes = this.recipeService.getRecipes()
        if (recipes.length === 0) {
            return this.recipeService.fetchRecipe();
        } else {
            return recipes
        }

    }

}