import messageModel from "../models/message.model.js";

export default class MessageManager {

    saveMessage(message, user){
        return messageModel.create({message, user})
    }

    getMessages(){
        return messageModel.find()
    }
}