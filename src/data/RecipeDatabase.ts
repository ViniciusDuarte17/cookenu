import { CustomError } from "../error/CustomError";
import { IRecipe } from "../model/recipe";
import { IRecipeRepository } from "../repository/recipeRepository";
import { BaseDatabase } from "./BaseDatabase";


export class RecipeDatabase extends BaseDatabase implements IRecipeRepository{
    private static TABLE_NAME = "Cookenu_Recipe"

    public async getRecipe (id: string): Promise<IRecipe[]> {
        const recipe: IRecipe[] = await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
        .select()
        .where({id})
        return recipe
    }

    public async insertRecipe (recipe: IRecipe): Promise<void> {
        const {id, title, description, authorId, date} = recipe
        
        try {
            await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
            .insert({
                id,
                title,
                description,
                author_id: authorId,
                date
            })
        } catch (error: any) {
            throw new CustomError(error.sqlMessage, 400);
        }
    }
}