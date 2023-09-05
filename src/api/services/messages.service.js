import { MessageManager } from "../dao/dbmanagers/managers/messageManager.js";

class MessageService {

    constructor()
    {
        this.messageManager = new MessageManager()
    }

    saveMessage(message, user)
    {
        return this.messageManager.saveMessage(message, user)
    }

    getAll()
    {
        return this.messageManager.getMessages()
    }
}

export default MessageService