import fs from 'fs'

export default class ProductManager {
    
    constructor(path)
    {
        this.path = path;
    };

    getNextId()
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if(data.length === 0)
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

    addProduct({title = '', description = '', code = '', price = 0, status = true, stock = 0, category = '', thumbnails = [], owner = 'admin'})
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let newData = {
                id: this.getNextId(),
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                category,
                status,
                owner
            };
            data.push(newData);
            fs.writeFileSync(this.path, JSON.stringify(data));
            return newData
        }else
        {
            let newData = [{
                id: this.getNextId(),
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                category,
                status
            }];
            fs.writeFileSync(this.path, JSON.stringify(newData));
            return newData
        }
    }

    getProducts(){
        if(fs.existsSync(this.path))
        {
            return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }else
        {
            return {status: 'Error', error: 'El archivo no existe o fue borrado'}
        }
    };

    getProductById(productId){
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let selectedProduct = data.find(el => el.id === productId);
            if(selectedProduct)
            {
                return selectedProduct
            }else
            {
                return {status: 'Error', error: 'Producto no encontrado'}
            }
        }else
        {
            return {status: 'Error', error: 'El archivo no existe o fue borrado'}
        }
    }

    updateProduct({productId, title = '', description = '', price = 0, thumbnail = [], code = '', stock = 0, status = true, category = ''})
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let productIndex = data.map(el => el.id).indexOf(productId);
            if(productIndex !== -1)
            {
                data[productIndex] = {
                    id: productId,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    status,
                    category
                }
                fs.writeFileSync(this.path, JSON.stringify(data));
                return data[productIndex]
            }else 
            {
                return {status: 'Error', error: 'El producto a actualizar no existe'}
            }
        }else
        {
            return {status: 'Error', error: 'El archivo no existe o fue borrado'}
        }
    }

    deleteProduct(productId)
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let productIndex = data.map(el => el.id).indexOf(productId);
            let selectedProduct = data[productIndex];
            if(productIndex !== -1)
            {
                data.splice(productIndex, 1);
                fs.writeFileSync(this.path, JSON.stringify(data));
                return selectedProduct
            }else 
            {
                return {status: 'Error', error: 'El producto a eliminar no existe'}
            }
        }else
        {
            return {status: 'Error', error: 'El archivo no existe o fue borrado'}
        }
    }
}
