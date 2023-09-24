import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config({ path: '.env' })

export default {
    persistence: process.argv[2]
}

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'neyenvrhovski@gmail.com',
        pass: process.env.GMAIL_SECRET
    }
})