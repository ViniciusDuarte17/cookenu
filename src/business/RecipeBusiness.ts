import moment from "moment";
import { CustomError, InvalidId, InvalidToken, UserNotFound } from "../error/CustomError";
import { IRecipe, IRecipeBusiness, IRecipeDTO } from "../model/recipe";
import { IRecipeRepository } from "../repository/recipeRepository";
import { Authenticator } from "../services/Authenticator";
import DataRecipe from "../services/DataRecipe";
import { IdGenerator } from "../services/IdGenerator";

export class RecipeBusiness {
    constructor(
        private recipeDatabase: IRecipeRepository,
        private authenticator: Authenticator
        ) {}

     async insertRecipeBusiness (token: string, input: IRecipeDTO): Promise<void> {
        try {
            const { title, description } = input;
            if(!token) {
                throw new InvalidToken()
            }

            if(!title || !description) {
                throw new CustomError("É necessário preencher o campo 'title' e 'description'", 400)
            }

            const user = this.authenticator.getTokenData(token)

            if(!user) {
                throw new UserNotFound()
            }

            const id = IdGenerator()
            const authorId = user.id
            const date = DataRecipe.currentTime()

            const recipe: IRecipe = {
                id,
                title,
                description,
                authorId,
                date
            }

            await this.recipeDatabase.insertRecipe(recipe)

        } catch (error: any) {
            throw new CustomError(error.message, 400)
        }
     }

     async getRecipeBusiness (id: string, token: string): Promise<IRecipeBusiness> {
        try {
            if(!id) {
                throw new InvalidId()
            }
            if(!token) {
                throw new CustomError("É necessário passar o token", 401)
            }

            const user = this.authenticator.getTokenData(token)

            if(!user) {
                throw new UserNotFound()
            }

            const recipe = await this.recipeDatabase.getRecipe(id)

            if(!recipe[0]) {
                throw new CustomError("Receita não encontrada!", 422)
            }

            const newData = moment(recipe[0].date).format('DD/MM/YYYY')
        
            const ricep: IRecipeBusiness = {
                id: recipe[0].id,
                title: recipe[0].title,
                description: recipe[0].description,
                date: newData
            }

            return ricep
            
        } catch (error: any) {
            throw new CustomError(error.message, 400)
        }
     }
}