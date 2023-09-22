import fs from 'fs'
import moment from 'moment';

export default class CartManager {
    
    constructor(path, ticketPath)
    {
        this.db = [];
        this.ticketDb = [];
    };

    getNextId()
    {
        if(this.db.length == 0)
        {
            return 1
        }else
        {
            return this.db[this.db.length - 1].id + 1
        }
    }

    addCart()
    {
        let newData = {
            id: this.getNextId(),
            products: []
        };
        this.db.push(newData);
        return newData;
    }

    getCartProducts(cartId)
    {
        let selectedCart = this.db.find(el => el.id === cartId);
        if(selectedCart)
        {
            return selectedCart
        }else
        {
            return {status: 'Error', error: 'El carrito no fue encontrado'}
        }
    }

    addProductToCart(cartId, productId, quantity = 0)
    {
        let selectedCart = this.db.find(el => el.id === cartId);
        let selectedCartIndex = this.db.map(el => el.id).indexOf(cartId);
        if(selectedCart)
        {
            let selectedProductIndex = selectedCart.products.map(el => el.product).indexOf(productId);
            if(selectedProductIndex !== -1)
            {
                selectedCart.products[selectedProductIndex].quantity += quantity
            }else
            {
                selectedCart.products.push({product: productId, quantity: quantity})
            }
            this.db[selectedCartIndex] = selectedCart;
            return selectedCart
        }else
        {
            return {status: 'Error', error: 'El carrito no fue encontrado'}
        }
    }

    removeProductFromCart(cartId, productId, cart)
    {
        let oldCart = this.db.find(el => el.id === cartId);
        let selectedCartIndex = this.db.map(el => el.id).indexOf(cartId);
        let selectedProductIndex = oldCart.map(el => el.product.id).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            oldCart.splice(selectedProductIndex, 1);
            this.db[selectedCartIndex] = {id: cartId, products: oldCart}
        }
        return this.db[selectedCartIndex]
    }

    editCartProducts(cartId, newProducts)
    {
        let selectedCart = this.db.find(el => el.id === cartId);
        let selectedCartIndex = this.db.map(el => el.id).indexOf(cartId);
        selectedCart.products = newProducts;
        this.db[selectedCartIndex] = selectedCart;
        return this.db[selectedCartIndex]
    }

    editProductInCart(cartId, productId, quantity = 0, cart)
    {
        let selectedCart = this.db.find(el => el.id === cartId);
        let selectedCartIndex = this.db.map(el => el.id).indexOf(cartId);
        let selectedProductIndex = selectedCart.map(el => el.product.id).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            selectedCart[selectedProductIndex].quantity = quantity;
            this.db[selectedCartIndex] = selectedCart;
        }
        return selectedCart
    }

    deleteProductsInCart(cartId)
    {
        let selectedCart = this.db.find(el => el.id === cartId);
        let selectedCartIndex = this.db.map(el => el.id).indexOf(cartId);
        selectedCart.products = [];
        this.db[selectedCartIndex] = selectedCart;
        return selectedCart
    }

    payCart(amount, purchaser, code)
    {
        let newData = {
            code,
            amount,
            purchaser,
            purchase_datetime: moment().format()
        };
        this.ticketDb.push(newData);
        return newData
    }

}
