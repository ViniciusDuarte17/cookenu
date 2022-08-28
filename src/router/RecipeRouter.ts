import express from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeController } from "../controller/RecipeController";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { Authenticator } from "../services/Authenticator";


export const recipeRouter = express.Router()


const recipeDatabase = new RecipeDatabase();
const authenticator = new Authenticator();
const recipeBusiness = new RecipeBusiness(recipeDatabase, authenticator)
const recipeController = new RecipeController(recipeBusiness)

recipeRouter.get("/:id", (res, req) => recipeController.getRecipeController(res,req))
recipeRouter.post("/", (res, req) => recipeController.insertRecipeController(res,req))