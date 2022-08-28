import { CustomError } from "../error/CustomError";
import { Iuser, IuserFeed } from "../model/user";
import { IUserRepository } from "../repository/userRepository";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase implements IUserRepository {
  private static TABLE_NAME = "Cookenu_User";

  public sinupUser = async (user: Iuser): Promise<void> => {
    try {
      await UserDatabase.connection.insert(user).into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(error.sqlMessage, 400);
    }
  };

  public findUserByEmail = async (email: string): Promise<Iuser> => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new CustomError(error.sqlMessage, 400);
    }
  };

  public findUserById = async (id: string): Promise<Iuser> => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select()
        .where({ id });

      return result[0];
    } catch (error: any) {
      throw new CustomError(error.sqlMessage, 400);
    }
  };

  public getFeed = async (userId: string): Promise<IuserFeed[]> => {
    const feed: IuserFeed[] = await UserDatabase.connection
    .select(
      "Cookenu_Recipe.id", "Cookenu_Recipe.title", "Cookenu_Recipe.description" , "Cookenu_Recipe.date as created_at", "Cookenu_User.id as user_id", "Cookenu_User.name as user_name"
    )
    .innerJoin("Cookenu_Recipe","Cookenu_User.id", "Cookenu_Recipe.author_id" )
    .innerJoin("Cookenu_Follow", "Cookenu_Recipe.author_id", "=", "Cookenu_Follow.user_follow_id")
    .where({"Cookenu_Follow.author_id": `${userId}`})
    .orderBy("date", "desc")
    .into(UserDatabase.TABLE_NAME)

    return feed
  }
  
}


// SELECT Cookenu_Recipe.id, Cookenu_Recipe.title, Cookenu_Recipe.description , Cookenu_Recipe.date as created_at, Cookenu_User.id as user_id, Cookenu_User.name as user_name
// FROM  Cookenu_User
// INNER JOIN Cookenu_Recipe ON Cookenu_User.id = Cookenu_Recipe.author_id
// INNER JOIN Cookenu_Follow ON Cookenu_User.id  = Cookenu_Follow.user_follow_id;
