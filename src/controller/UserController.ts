import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ILoginDTO, IuserDTO } from "../model/user";

export class UserController {
    constructor(private userBusiness: UserBusiness) {}
   
    public userSinup = async (req: Request, res: Response ) => {
        try {
            const {name, email, password} = req.body;
            const input : IuserDTO = {
                name,
                email,
                password
            }

           const token = await this.userBusiness.signup(input)
            
           res.status(200).send({message: "usuário criado com sucesso", token})

        } catch (error: any) {
            res.send(error.message).status(error.statusCode)
        }
    }

    public userLogin = async (req: Request, res: Response ) => {
        try {
            const { email, password} = req.body;
            const input : ILoginDTO = {
                email,
                password
            }

           const token = await this.userBusiness.login(input)
            
           res.status(200).send({message: "usuário logado com sucesso!", token})

        } catch (error: any) {
            res.send(error.message).status(error.statusCode)
        }
    }

    public profile = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string

            const result = await this.userBusiness.getProfiller(token)

            res.status(201).send(result)
        } catch (error: any) {
            res.send(error.message).status(error.statusCode)
        }
    }
    public getUserByIdController = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const id = req.params.id as string

            const result = await this.userBusiness.getUserById(token, id)

            res.status(201).send(result)
        } catch (error: any) {
            res.send(error.message).status(error.statusCode)
        }
    }

    public getFeed = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string

            const feed = await this.userBusiness.getFeed(token)

            res.status(201).send(feed)
            
        } catch (error: any) {
            res.send(error.message).status(error.statusCode)
        }
    }
}