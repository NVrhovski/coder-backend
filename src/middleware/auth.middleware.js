export const adminMiddleware = async (req, res, next) => {
    if(req.user.user.role == 'Administrator')
    {
        next()
    }else
    {
        return res.status(401).json({status: 'Error', error: 'Unauthorized'})
    }
}

export const userMiddleware = async (req, res, next) => {
    if(req.user.user.role == 'User')
    {
        next()
    }else
    {
        return res.status(401).json({status: 'Error', error: 'Unauthorized'})
    }
}