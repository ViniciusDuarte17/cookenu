import { IuserFollow } from "../model/userFollow";


export interface IUserFollowRepository {
    getFriendId(id: string): Promise<IuserFollow[]>
    insertRecipe (recipe: IuserFollow): Promise<void>
}