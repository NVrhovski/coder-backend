export default class MessageRepository {

    constructor(dao)
    {
        this.dao = dao
    }

    saveMessage(message, user)
    {
        return this.dao.saveMessage(message, user)
    }

    getAll()
    {
        return this.dao.getMessages()
    }
}