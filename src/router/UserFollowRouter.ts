import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserFollowBusiness } from "../business/UserFollowBusiness";
import { UserFollowController } from "../controller/UserFollowController";
import { UserDatabase } from "../data/UserDatabase";
import { UserFollowDatabase } from "../data/UserFollowDatabase";
import { Authenticator } from "../services/Authenticator";



export const userFollowRouter = express.Router()

const userFollowDatabase = new UserFollowDatabase()
const authenticator = new Authenticator();
const userDataBase = new UserDatabase()
const userFollowBusiness = new UserFollowBusiness(userFollowDatabase, authenticator, userDataBase)
const userFollowController = new UserFollowController(userFollowBusiness)


userFollowRouter.post("/:userFollowId", (res, req) => userFollowController.insertUserFollow(res, req))
userFollowRouter.post("/unfollow/:id", (res, req) => userFollowController.unfollow(res, req))