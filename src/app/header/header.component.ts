import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onFetch() {
    this.recipeService.fetchRecipe().subscribe(
      () => (this.recipeService.emitChanges())
    );

  }

  onSave() {
    this.recipeService.storeRecipe();
  }


}
