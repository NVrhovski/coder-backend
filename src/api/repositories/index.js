import { Product, Cart, Message } from "../dao/factory.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";
import MessageRepository from './message.repository.js';

export const ProductService = new ProductRepository(new Product());
export const CartService = new CartRepository(new Cart());
export const MessageService = new MessageRepository(new Message());
