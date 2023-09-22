import fs from 'fs';

export default class MessageManager {

    constructor(path)
    {
        this.path = path;
    }

    getNextId()
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if(data.length == 0)
            {
                return 1
            }else
            {
                return data[data.length - 1].id + 1
            }
        }else 
        {
            return 1
        }
    }

    saveMessage(message, user){
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let newData = {
                id: this.getNextId(),
                message,
                user
            };
            data.push(newData);
            fs.writeFileSync(this.path, JSON.stringify(data));
            return newData
        }else
        {
            let newData = [{
                id: this.getNextId(),
                message,
                user
            }];
            fs.writeFileSync(this.path, JSON.stringify(newData));
            return newData
        }
    }

    getMessages(){
        if(fs.existsSync(this.path))
        {
            return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }else
        {
            return {status: 'Error', error: 'El archivo no existe o fue borrado'}
        }
    }
}