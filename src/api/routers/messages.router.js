import { Router } from "express"
import { getAll, saveMessage } from "../controllers/messages.controller.js";

const messagesRouter = Router();

messagesRouter.post('/', saveMessage)

messagesRouter.get('/', getAll)

export default messagesRouter