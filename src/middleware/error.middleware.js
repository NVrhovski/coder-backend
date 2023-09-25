import EErrors from "../errors/enums.js";

export default (error, req, res, next) => {
    switch(error.code) {
        case EErrors.UNKNOW_PRODUCT_ERROR:
            return res.status(400).send({
                status: 'Error',
                error: error.name,
                cause: error.cause
            })
        case EErrors.UNKNOW_CART_ERROR:{
            return res.status(400).send({
                status: 'Error',
                error: error.name,
                cause: error.cause
            })
        }
        default:
            return res.status(400).send({status: 'Error', error: 'Unhandled error'})
    }
}