import cartModel from "./models/cart.model.js";

export class CartManager {

    addCart()
    {
        return cartModel.create({products: []})
    }

    getCartProducts(cartId)
    {
        return cartModel.findById(cartId)
    }

    addProductToCart(cartId, productId, quantity = 0, cart)
    {
        let oldCart = cart;
        console.log(oldCart)
        let selectedProductIndex = oldCart.map(el => el.product).indexOf(productId);
        if(selectedProductIndex !== -1)
        {
            oldCart[selectedProductIndex].quantity += quantity
        }else
        {
            oldCart.push({product: productId, quantity: quantity})
        }
        return cartModel.findByIdAndUpdate(cartId, {products: oldCart})
    }

}
