import { ProductService } from "../repositories/index.js";
import CustomError from '../../errors/custom_error.js';
import { generateUnknowProductError } from '../../errors/info.js';
import EErrors from '../../errors/enums.js';

export const getAll = async (req, res) => {
    const message = await ProductService.getAll(req.query);
    const data = message.docs;
    delete message.docs;
    return res.status(200).json({status: 'Success', payload: data, ...message})
}

export const getProductById = async (req, res) => {
    try {
        const message = await ProductService.getProductById(req.params.id);
        if(!message)
        {
            CustomError.createError({
                name: 'Unknow product error',
                cause: generateUnknowProductError(req.params.id),
                message: 'Error while retrieving product',
                code: EErrors.UNKNOW_PRODUCT_ERROR
            })
        }
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant get product info - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}

export const addProduct = async (req, res) => {
    try {
        const message = await ProductService.addProduct({...req.body, owner: req.user.user.email});
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        req.logger.error(`Cant add product - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error})
    }
}

export const updateProduct = async (req, res) => {
    try {
        if(req.user.user.role === 'Premium')
        {
            const product = await ProductService.getProductById(req.params.id);
            if(product.owner === req.user.user.email)
            {
                const message = await ProductService.updateProduct({productId: req.params.id, ...req.body});
                if(!message)
                {
                    CustomError.createError({
                        name: 'Unknow product error',
                        cause: generateUnknowProductError(req.params.id),
                        message: 'Error while retrieving product',
                        code: EErrors.UNKNOW_PRODUCT_ERROR
                    })
                }
                return res.status(200).json({status: 'Success', payload: message})
            }else
            {
                return res.status(400).json({status: 'Error', error: 'Can only update your products'})
            }
        }else
        {
            const message = await ProductService.updateProduct({productId: req.params.id, ...req.body});
            if(!message)
            {
                CustomError.createError({
                    name: 'Unknow product error',
                    cause: generateUnknowProductError(req.params.id),
                    message: 'Error while retrieving product',
                    code: EErrors.UNKNOW_PRODUCT_ERROR
                })
            }
            return res.status(200).json({status: 'Success', payload: message})
        }
    } catch (error) {
        req.logger.error(`Cant update product - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        if(req.user.user.role === 'Premium')
        {
            const product = await ProductService.getProductById(req.params.id);
            if(product.owner === req.user.user.email)
            {
                const message = await ProductService.deleteProduct(req.params.id);
                if(!message)
                {
                    CustomError.createError({
                        name: 'Unknow product error',
                        cause: generateUnknowProductError(req.params.id),
                        message: 'Error while retrieving product',
                        code: EErrors.UNKNOW_PRODUCT_ERROR
                    })
                }
                return res.status(200).json({status: 'Success', payload: message})
            }else
            {
                return res.status(400).json({status: 'Error', error: 'Can only delete your products'})
            }
        }
        else
        {
            const message = await ProductService.deleteProduct(req.params.id);
            if(!message)
            {
                CustomError.createError({
                    name: 'Unknow product error',
                    cause: generateUnknowProductError(req.params.id),
                    message: 'Error while retrieving product',
                    code: EErrors.UNKNOW_PRODUCT_ERROR
                })
            }
            return res.status(200).json({status: 'Success', payload: message})
    }
    } catch (error) {
        req.logger.error(`Cant delete product - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error: error.name, cause: error.cause})
    }
}