import { UserDatabase } from "../data/UserDatabase";
import { UserFollowDatabase } from "../data/UserFollowDatabase";
import { CustomError, InvalidId, InvalidToken, UserNotFound } from "../error/CustomError";
import { IuserFollow } from "../model/userFollow";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class UserFollowBusiness {
    constructor(
        private userFollowDatabase: UserFollowDatabase,
        private authenticator: Authenticator,
        private userDataBase: UserDatabase
        ){}

   public async followBusiness (token: string, userFollowId: string): Promise<void>  {
        try {
            if(!token){
                throw new InvalidToken()
            }
            if(!userFollowId) {
                throw new InvalidId()
            }
            const authorUser = this.authenticator.getTokenData(token)
            
            if(!authorUser) {
                throw new UserNotFound()
            }

            const user = await this.userDataBase.findUserById(userFollowId)
        
            if(!user){
                throw new CustomError("Usuário cujo quer seguir não existe!", 402)
            }
       
            const followIdDb = await this.userFollowDatabase.getFriendId(userFollowId)
           
            const usuario = followIdDb.find( (i) => i.author_id === authorUser.id)
           
            if(usuario) {
                throw new CustomError("Não é possível seguri o mesmo usuário duas vezes!", 400)
            }

            const id = IdGenerator()

            const userDb: IuserFollow = {
                id,
                author_id: authorUser.id,
                user_follow_id: userFollowId
            }

            await this.userFollowDatabase.insertRecipe(userDb)

        } catch (error: any) {
            throw new CustomError(error.message, 400)
        }
    }

    public async unfollowBusiness (token: string, id: string): Promise<void> {
        if(!token){
            throw new InvalidToken()
        }
        if(!id) {
            throw new InvalidId()
        }

        const authorUser = this.authenticator.getTokenData(token)

            if(!authorUser) {
                throw new UserNotFound()
            }

            const user = await this.userDataBase.findUserById(id)
        
            if(!user) {
                throw new CustomError("Usuário cujo quer deixar de seguir não existe!", 402)
            }

            const useFollow = await this.userFollowDatabase.getFriendId(id)
           
            if(!useFollow[0]) {
                throw new CustomError("Não é possivél deixar de seguir usuário que não existe", 400)
            }
           
            await this.userFollowDatabase.deleteFriendById(useFollow[0].id)
    }
}