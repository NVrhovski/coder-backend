import userModel from './models/user.model.js'

export class SessionManager {

    register(user)
    {
        return userModel.create({...user, role: 'User'})
    }

    login(email, password)
    {
        return userModel.findOne({email, password})
    }

    exist(email)
    {
        return userModel.findOne({email})
    }
}