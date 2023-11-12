import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const generateToken = (user) => {
    return jwt.sign({user}, config.jwtSecret, {expiresIn: '24h'})
}

export const decryptToken = (token) => {
    return jwt.verify(token, config.jwtSecret)
}

export const extractCookie = (req) => {
    return (req && req.cookies) ? req.cookies['keyCookieForJWT'] : null
}

export const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let string = '';
    for(let i = 0; i <= 19; i++)
    {
        let randomNumber = Math.floor(Math.random() * characters.length);
        string += characters.substring(randomNumber, randomNumber + 1); 
    }
    return string
}

export default __dirname