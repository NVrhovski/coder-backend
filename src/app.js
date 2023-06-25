import express from 'express';
import productsRouter from './api/products/products.router.js';
import cartsRouter from './api/carts/carts.router.js';

const app = express();
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080)