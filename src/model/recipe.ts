export interface IRecipe {
    id: string
    title: string,
    description: string,
    authorId: string
    date: Date
}
export interface IRecipeBusiness {
    id: string
    title: string,
    description: string,
    date: string
}
export interface IRecipeDTO {
    title: string,
    description: string,
}