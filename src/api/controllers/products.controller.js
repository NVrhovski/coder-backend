import { ProductService } from "../repositories/index.js";

export const getAll = async (req, res) => {
    const message = await ProductService.getAll(req.query);
    const data = message.docs;
    delete message.docs;
    return res.status(200).json({status: 'Success', payload: data, ...message})
}

export const getProductById = async (req, res) => {
    try {
        const message = await ProductService.getProductById(req.params.id);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const addProduct = async (req, res) => {
    try {
        const message = await ProductService.addProduct({...req.body});
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const message = await ProductService.updateProduct({productId: req.params.id, ...req.body});
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const message = await ProductService.deleteProduct(req.params.id);
        return res.status(200).json({status: 'Success', payload: message})
    } catch (error) {
        return res.status(400).json({status: 'Error', error})
    }
}