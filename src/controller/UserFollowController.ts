import { Request, Response } from "express";
import { UserFollowBusiness } from "../business/UserFollowBusiness";

export class UserFollowController {
    constructor(private userFollowBusiness: UserFollowBusiness) {}
    
    public insertUserFollow = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string;
            const userFollowId = req.params.userFollowId as string;

            await this.userFollowBusiness.followBusiness(token, userFollowId)

            res.status(201).send({message: "seguindo com sucesso!"})
            
        } catch (error: any) {
            res.send(error.message).status(error.statusCode)
        }
    }

    public unfollow = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const id = req.params.id as string;

            await this.userFollowBusiness.unfollowBusiness(token, id)

            res.status(201).send({message: "Deixou de seguir com sucesso!" })

        } catch (error: any) {
            res.send(error.message).status(error.statusCode)
        }
    }
}