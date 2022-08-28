import { Iuser, IuserFeed } from "../model/user";

export interface IUserRepository {
    sinupUser(user: Iuser): Promise<void>
    findUserByEmail(email: string): Promise<Iuser>
    findUserById(id: string): Promise<Iuser>
    getFeed(userId: string): Promise<IuserFeed[]> 
}
