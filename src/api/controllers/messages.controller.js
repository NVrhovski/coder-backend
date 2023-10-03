import { MessageService } from "../repositories/index.js";

export const saveMessage = async (req, res) => {
    try {
        const message = await MessageService.saveMessage(req.body.message, req.body.user);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant save message - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error})
    }
}

export const getAll = async (req, res) => {
    try {
        const message = await MessageService.getAll();
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant get messages - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error})
    }
}