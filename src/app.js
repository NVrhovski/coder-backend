import express from 'express';
import productsRouter from './api/products/products.router.js';
import cartsRouter from './api/carts/carts.router.js';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './router/views.router.js'
import mongoose from 'mongoose';
import messagesRouter from './api/messages/messages.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionRouter from './api/session/session.router.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import axios from 'axios';

const URI = 'mongodb+srv://neyenvrhovski:cascotazo@coder-backend.lipdxn8.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/static', express.static(`${__dirname}/public`));
app.use(session({
    store: MongoStore.create({
        mongoUrl: URI,
        dbName: 'ecommerce',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 100
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.engine('handlebars', handlebars.engine({
    helpers: {
        forHelper: function(n, block) {
            var accum = '';
            for(var i = 1; i <= n; ++i)
                accum += block.fn(i);
            return accum;
        }
    }
}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/session', sessionRouter);

mongoose.connect(URI, {
    dbName: 'ecommerce'
}).then(() => {
    console.log('DB connected!')
    const httpServer = app.listen(8080);
    const wsServer = new Server(httpServer);

    wsServer.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        socket.on('client_add_product', async () => {
            try {
                let response = await axios({
                    url: 'http://localhost:8080/api/products',
                    method: 'GET'
                });
                wsServer.emit('server_add_product', JSON.stringify(response.data));
            } catch (error) {
                console.log(error);
            }
        })

        socket.on('client_message_sent', async (data) => {
            try {
                await axios({
                    url: 'http://localhost:8080/api/messages',
                    data, 
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let response = await axios({
                    url: 'http://localhost:8080/api/messages',
                    method: 'GET'
                });
                let parsedMessages = response.data.payload
                wsServer.emit('server_message_sent', JSON.stringify(parsedMessages));
            } catch (error) {
                console.log(error)
            }
        })
    })
})
.catch((e) => {
    console.log(`DB Error: ${e}`);
})