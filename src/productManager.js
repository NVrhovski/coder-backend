import fs from 'fs'

export class ProductManager {
    
    constructor(path)
    {
        this.path = path;
    };

    getNextId()
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            return data[data.length - 1].id + 1
        }else 
        {
            return 1
        }
    }

    addProduct(title = '', description = '', price = 0, thumbnail = '/assets/images/default-image.png', code = '', stock = 0)
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let newData = {
                id: this.getNextId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            data.push(newData);
            fs.writeFileSync(this.path, JSON.stringify(data));
            return 'Producto agregado correctamente!';
        }else
        {
            let newData = [{
                id: this.getNextId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }];
            fs.writeFileSync(this.path, JSON.stringify(newData));
            return 'Producto agregado correctamente!';
        }
    }

    getProducts(){
        if(fs.existsSync(this.path))
        {
            return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }else
        {
            return 'Error: El archivo no existe o fue borrado'
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
                return undefined
            }
        }else
        {
            return 'Error: El archivo no existe o fue borrado'
        }
    }

    updateProduct(productId, title = '', description = '', price = 0, thumbnail = '/assets/images/default-image.png', code = '', stock = 0)
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
                    stock
                }
                fs.writeFileSync(this.path, JSON.stringify(data));
                return 'Producto actualizado con exito!'
            }else 
            {
                return 'Error: el producto a actualizar no existe'
            }
        }else
        {
            return 'Error: El archivo no existe o fue borrado';
        }
    }

    deleteProduct(productId)
    {
        if(fs.existsSync(this.path))
        {
            let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let productIndex = data.map(el => el.id).indexOf(productId);
            if(productIndex !== -1)
            {
                data.splice(productIndex, 1);
                fs.writeFileSync(this.path, JSON.stringify(data));
                return 'Producto eliminado con exito!'
            }else 
            {
                return 'Error: el producto a eliminar no existe'
            }
        }else
        {
            return 'Error: El archivo no existe o fue borrado';
        }
    }
}
