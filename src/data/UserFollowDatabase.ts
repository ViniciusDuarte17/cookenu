import { CustomError } from "../error/CustomError";
import { IuserFollow } from "../model/userFollow";
import { IUserFollowRepository } from "../repository/userFollow";
import { BaseDatabase } from "./BaseDatabase";


export class UserFollowDatabase extends BaseDatabase implements IUserFollowRepository {
    private static TABLE_NAME = "Cookenu_Follow";

    async getFriendId(id: string): Promise<IuserFollow[]> {
     
      try {
        const followId: IuserFollow[] = [];
        const result: IuserFollow[] = await BaseDatabase.connection()
          .select("*")
          .where("user_follow_id", "=", id)
          .from(UserFollowDatabase.TABLE_NAME);
  
        for (let friend of result) {
          followId.push(friend);
        }
        return result; 
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }

      public async insertRecipe (recipe: IuserFollow): Promise<void> {
        const {id, author_id, user_follow_id} = recipe
        
        try {
            await UserFollowDatabase.connection(UserFollowDatabase.TABLE_NAME)
            .insert({
              id,
              author_id,
              user_follow_id
            })

        } catch (error: any) {
            throw new CustomError(error.sqlMessage, 400);
        }
    }

    async deleteFriendById (id: string): Promise<void> {
      try {
        await UserFollowDatabase.connection()
        .delete()
        .where({id})
        .from(UserFollowDatabase.TABLE_NAME)
        
      } catch (error: any) {
        throw new CustomError(error.sqlMessage, 400)
      }
    }
}