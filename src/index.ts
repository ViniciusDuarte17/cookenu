import {app} from "./app";
import { recipeRouter } from "./router/RecipeRouter";
import { userFollowRouter } from "./router/UserFollowRouter";
import {userRouter} from "./router/UserRouter"


app.use("/user", userRouter)
app.use("/recipe", recipeRouter)
app.use("/userFollow", userFollowRouter)