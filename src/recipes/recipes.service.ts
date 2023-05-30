import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
	recipes: Recipe[] = [];

	async create(data: NewRecipeInput): Promise<Recipe> {

		const recipe: Recipe = {
			id: uuidv4(),
			...data,
			creationDate: new Date(),
		};

		this.recipes.push(recipe);

		return recipe;
	}

	async findOneById(id: string): Promise<Recipe> {
		return this.recipes.find((recipe: Recipe): boolean => recipe.id === id);
	}

	async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
		return this.recipes;
	}

	async remove(id: string): Promise<boolean> {
		this.recipes = this.recipes.filter((recipe: Recipe): boolean => recipe.id !== id);
		return true;
	}
}
