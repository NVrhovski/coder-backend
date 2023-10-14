export default class MessageManager {

    constructor()
    {
        this.db = []
    }

    getNextId()
    {
        if(this.db.length === 0)
        {
            return 1
        }else
        {
            return this.db[this.db.length - 1].id + 1
        }
    }

    saveMessage(message, user){
        let newData = {
            id: this.getNextId(),
            message,
            user
        };
        this.db.push(newData);
        return newData;
    }

    getMessages(){
        return this.db
    }
}