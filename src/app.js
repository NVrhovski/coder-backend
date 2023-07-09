import express from 'express';
import productsRouter from './api/products/products.router.js';
import cartsRouter from './api/carts/carts.router.js';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './router/views.router.js'

const app = express();
app.use(express.json());
app.use('/static', express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(8080);
const wsServer = new Server(httpServer);

wsServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('client_add_product', async () => {
        let data = []
        try {
            let response = await fetch('http://localhost:8080/api/products');
            data = await response.json();
            wsServer.emit('server_add_product', JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    })
})