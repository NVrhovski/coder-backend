import productModel from "./models/product.model.js";

export class ProductManager {

    addProduct({title = '', description = '', code = '', price = 0, status = true, stock = 0, category = '', thumbnails = []})
    {
        return productModel.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })
    }

    getProducts(limit){
        return productModel.find().limit(limit)
    };

    getProductById(productId){
        return productModel.findById(productId)
    }

    updateProduct({productId, title = '', description = '', price = 0, thumbnail = [], code = '', stock = 0, status = true, category = ''})
    {
        return productModel.findByIdAndUpdate(productId, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        })
    }

    deleteProduct(productId)
    {
        return productModel.findByIdAndDelete(productId)
    }
}
