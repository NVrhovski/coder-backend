export default class MessageDTO{
    constructor(message)
    {
        this.user = message.user || 'admin@coderhouse.com';
        this.message = message.message;
    }
}