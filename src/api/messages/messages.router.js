import { Router } from "express"
import { MessageManager } from "../../dao/dbmanagers/messageManager.js";

const messagesRouter = Router();

const messageManager = new MessageManager();

messagesRouter.post('/', async (req, res) => {
    try {
        const message = await messageManager.saveMessage(req.body.message, req.body.user);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

messagesRouter.get('/', async (req, res) => {
    try {
        const message = await messageManager.getMessages();
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
})

export default messagesRouter