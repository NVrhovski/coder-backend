import config from "../../config/config.js";

export let Product;
export let Cart;
export let Message;

switch (config.persistence) {
    case 'mongo':
        const { default: ProductMongo } = await import('./dbmanagers/managers/productManager.js');
        const { default: CartMongo } = await import('./dbmanagers/managers/cartManager.js');
        const { default: MessageMongo } = await import('./dbmanagers/managers/messageManager.js');
        Product = ProductMongo,
        Cart = CartMongo,
        Message = MessageMongo
        break;
    case 'memory':
        const { default: ProductMemory } = await import('./dbmanagers/managers/productManager.js');
        const { default: CartMemory } = await import('./dbmanagers/managers/cartManager.js');
        const { default: MessageMemory } = await import('./dbmanagers/managers/messageManager.js');
        Product = ProductMemory,
        Cart = CartMemory,
        Message = MessageMemory
        break;
    default:
        const { default: ProductFile } = await import('./fsmanagers/productManager.js');
        const { default: CartFile } = await import('./fsmanagers/cartManager.js');
        const { default: MessageFile } = await import('./fsmanagers/messageManager.js');
        Product = ProductFile,
        Cart = CartFile,
        Message = MessageFile
        break;
}