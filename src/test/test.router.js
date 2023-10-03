import { Router } from "express";
import { faker } from '@faker-js/faker';
import fs from 'fs';
import __dirname from "../utils.js";

const testRouter = Router();

testRouter.get('/mockingproducts', (req, res) => {
    const fakeProducts = [];
    for(let i = 0; i <= 99; i++)
    {
        fakeProducts.push({
            id: i + 1,
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            price: faker.commerce.price(),
            status: faker.datatype.boolean(),
            stock: faker.number.int({min: 0, max: 2000}),
            category: faker.commerce.department(),
            thumbnails: [faker.image.url(), faker.image.url()]
        })
    }
    return res.status(200).json({status: 'Success', payload: fakeProducts})
})

testRouter.get('/loggerTest', (req, res) => {
    if(fs.existsSync(`${__dirname}/errors.log`))
    {
        let data = JSON.parse(fs.readFileSync(`${__dirname}/errors.log`, 'utf-8'))
        return res.status(200).json({status: 'Success', payload: data})
    }else 
    {
        return res.status(200).json({status: 'Success', payload: {}})
    }
})

export default testRouter