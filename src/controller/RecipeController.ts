import { Request, Response } from "express";
import { IRecipeDTO } from "../model/recipe";
import {RecipeBusiness} from "../business/RecipeBusiness";


export class RecipeController {
  constructor(private recipeBusiness: RecipeBusiness) {}

  public insertRecipeController = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, description } = req.body;
            const token = req.headers.authorization as string;

            const input: IRecipeDTO = {
                title,
                description
            }

            await this.recipeBusiness.insertRecipeBusiness(token, input)

            res.status(201).send({message: "Receita criada com sucesso!"})
        } catch (error: any) {
            res.send(error.message).status(error.statusCode)
        }
    }

  public getRecipeController = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization as string;
        const id = req.params.id as string

      const recipe =  await this.recipeBusiness.getRecipeBusiness(id, token)

        res.status(200).send(recipe)
    } catch (error: any) {
        res.send(error.message).status(error.statusCode)
    }
  }  
}