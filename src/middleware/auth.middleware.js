export const adminMiddleware = async (req, res, next) => {
    if(req.user.user.role === 'Admin' || req.user.user.role === 'Premium')
    {
        next()
    }else
    {
        return res.status(401).json({status: 'Error', error: 'Unauthorized'})
    }
}

export const userMiddleware = async (req, res, next) => {
    if(req.user.user.role === 'User' || req.user.user.role === 'Premium')
    {
        next()
    }else
    {
        return res.status(401).json({status: 'Error', error: 'Unauthorized'})
    }
}

export const premiumMiddleware = async (req, res, next) => {
    
}