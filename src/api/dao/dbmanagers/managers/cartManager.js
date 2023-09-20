import cartModel from "../models/cart.model.js";
import ticketModel from "../models/ticket.model.js";

export default class CartManager {

    addCart()
    {
        return cartModel.create({products: []})
    }

    getCartProducts(cartId)
    {
        return cartModel.findById(cartId).populate('products.product')
    }

    addProductToCart(cartId, productId, quantity = 0, cart)
    {
        let oldCart = cart;
        let parsedCart = [];
        oldCart.forEach((el) => {
            let parsedProduct = {
                product: el.product._id.toString(),
                quantity: el.quantity,
                _id: el._id
            };
            parsedCart.push(parsedProduct)
        })
        let selectedProductIndex = parsedCart.map(el => el.product).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            parsedCart[selectedProductIndex].quantity += quantity
        }else
        {
            let newItem = {
                product: productId, 
                quantity
            }
            parsedCart.push(newItem);  
        }
        return cartModel.findByIdAndUpdate(cartId, {products: parsedCart})
    }

    removeProductFromCart(cartId, productId, cart)
    {
        let oldCart = cart;
        let selectedProductIndex = oldCart.map(el => el.product._id.toString()).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            oldCart.splice(selectedProductIndex, 1);
        }
        return cartModel.findByIdAndUpdate(cartId, {products: oldCart})
    }

    editCartProducts(cartId, newProducts)
    {
        return cartModel.findByIdAndUpdate(cartId, {products: newProducts})
    }

    editProductInCart(cartId, productId, quantity = 0, cart)
    {
        let oldCart = cart;
        let selectedProductIndex = oldCart.map(el => el.product._id.toString()).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            oldCart[selectedProductIndex].quantity = quantity
        }
        return cartModel.findByIdAndUpdate(cartId, {products: oldCart})
    }

    deleteProductsInCart(cartId)
    {
        return cartModel.findByIdAndUpdate(cartId, {products: []})
    }

    payCart(amount, purchaser, code)
    {
        return ticketModel.create({amount, purchaser, code})
    }
}
