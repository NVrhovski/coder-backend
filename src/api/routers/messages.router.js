import { Router } from "express"
import { getAll, saveMessage } from "../controllers/messages.controller.js";
import passport from "passport";
import { userMiddleware } from "../../middleware/auth.middleware.js";

const messagesRouter = Router();

messagesRouter.post('/', passport.authenticate('current'), userMiddleware, saveMessage)

messagesRouter.get('/', getAll)

export default messagesRouter