import { Ingredient } from '../shared/ingredient.model';
import { Step } from '../shared/step.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public prepTime: number;
    public coolTime: number;
    public serves: number;
    public difficulty: string;
    public ingredients: Ingredient[];
    public steps: Step[];

    constructor(name: string, description: string, imagePath: string, prepTime: number, coolTime: number, serves: number, difficulty: string, ingredients: Ingredient[], steps: Step[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.prepTime = prepTime;
        this.coolTime = coolTime;
        this.serves = serves;
        this.difficulty = difficulty;
        this.steps = steps;
    }
}
