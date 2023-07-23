import messageModel from "./models/message.model.js";

export class MessageManager {

    saveMessage(message, user){
        return messageModel.create({message, user})
    }

    getMessages(){
        return messageModel.find()
    }
}