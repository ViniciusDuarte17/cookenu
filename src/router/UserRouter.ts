import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";


export const userRouter = express.Router()

const userDataBase = new UserDatabase()
const hashManger = new HashManager()
const authenticator = new Authenticator()

const userBusiness = new UserBusiness(userDataBase, hashManger, authenticator )
const userController = new UserController(userBusiness)


userRouter.get("/profile", (res, req) => userController.profile(res, req)) // pega perfil pelo token
userRouter.get("/feed", (res, req) => userController.getFeed(res,req))
userRouter.get("/profile/:id", (res, req) => userController.getUserByIdController(res, req)) // pega usuário por id
userRouter.post("/sinup", (res, req) => userController.userSinup(res, req)) // cadastro de usuário gera um token
userRouter.post("/login", (res, req) => userController.userLogin(res, req)) // login de usuário cadastrado