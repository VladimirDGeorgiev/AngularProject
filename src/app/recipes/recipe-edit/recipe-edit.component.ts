import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormArrayName, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    // console.log(this.recipeForm.value);

    if (!this.editMode) {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['/recipes']);
    } else {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
      this.router.navigate(['/recipes', this.id]);
    }
  }

  onCancal() {
    this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray)
      .push(new FormGroup({
        name: new FormControl(null, Validators.required),
        amaunt: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
  }

  onDeleteIngredient(i) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      recipe.ingredients.length > 0 ? recipe.ingredients.forEach((ing) => {
        recipeIngredients.push(new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          amaunt: new FormControl(ing.amaunt, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
        // tslint:disable-next-line: no-unused-expression
      }) : new FormArray([]);
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    });


  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

}
