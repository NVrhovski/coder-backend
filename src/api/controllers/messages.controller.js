import MessageService from "../services/messages.service.js";

const messageService = new MessageService();

export const saveMessage = async (req, res) => {
    try {
        const message = await messageService.saveMessage(req.body.message, req.body.user);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const getAll = async (req, res) => {
    try {
        const message = await messageService.getAll();
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}