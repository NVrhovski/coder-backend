import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config({ path: '.env' })

export default {
    persistence: process.argv[2] || 'mongo',
    enviroment: process.env.ENVIROMENT || 'development',
    mongoDBUri: process.env.MONGODB_URI,
    port: process.env.PORT || 8080,
    hostURL: process.env.HOST_URL || 'http://localhost:8080',
    jwtSecret: process.env.JWT_SECRET,
    clientGithubID: process.env.CLIENT_GITHUB_ID,
    clientGithubSecret: process.env.CLIENT_GITHUB_SECRET,
    gmailSecret: process.env.GMAIL_SECRET
}

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'neyenvrhovski@gmail.com',
        pass: process.env.GMAIL_SECRET
    }
})