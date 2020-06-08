import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormArrayName, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  types = ['kg', 'g', 'pack', 'litre', 'galon', 'pieces']
  difficultys = ['Easy', 'Medium', 'Hard', 'Expert']

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
    if (!this.editMode) {
      this.recipeService.addRecipe(this.recipeForm.value).subscribe((recipe: Recipe[]) => {
        this.recipeService.emitChanges();
        this.router.navigate(['/recipes']);
      })
    } else {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value).subscribe((recipe: Recipe[]) => {
        this.recipeService.emitChanges();
        this.router.navigate(['/recipes', this.id]);
      })
    }
  }

  onCancal() {
    this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray)
      .push(new FormGroup({
        name: new FormControl(null, Validators.required),
        amaunt: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        type: new FormControl(null, Validators.required)
      }));
  }

  onDeleteIngredient(i) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  onDeleteStep(i) {
    (this.recipeForm.get('steps') as FormArray).removeAt(i);
  }

  onAddStep() {
    (this.recipeForm.get('steps') as FormArray)
      .push(new FormGroup({
        title: new FormControl(null),
        content: new FormControl(null)
      }));
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipePrepTime;
    let recipeCookTime;
    let recipeServes;
    let recipeDifficulty = '';
    const recipeIngredients = new FormArray([]);
    const recipeSteps = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      recipePrepTime = recipe.prepTime;
      recipeCookTime = recipe.coolTime;
      recipeServes = recipe.serves;
      recipeDifficulty = recipe.difficulty;
      recipe.ingredients.length > 0 ? recipe.ingredients.forEach((ing) => {
        recipeIngredients.push(new FormGroup({
          name: new FormControl(ing.name, [Validators.required, Validators.maxLength(30)]),
          amaunt: new FormControl(ing.amaunt, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          type: new FormControl(ing.type, Validators.required)
        }));
        // tslint:disable-next-line: no-unused-expression
      }) : new FormArray([]);
      recipe.steps.length > 0 ? recipe.steps.forEach((step) => {
        recipeSteps.push(new FormGroup({
          title: new FormControl(step.title),
          content: new FormControl(step.content)
        }));
      }) : new FormArray([]);
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(recipeDescription, [Validators.required, Validators.maxLength(200)]),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      prepTime: new FormControl(recipePrepTime, Validators.required),
      cookTime: new FormControl(recipeCookTime),
      serves: new FormControl(recipeServes, Validators.required),
      difficulty: new FormControl(recipeDifficulty, Validators.required),
      ingredients: recipeIngredients,
      steps: recipeSteps
    });
  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get steps() { // a getter!
    return (this.recipeForm.get('steps') as FormArray).controls;
  }

  isHaveIngredients() {
    return (this.recipeForm.get('ingredients') as FormArray).value[0];
  }

}
