import { Router, raw } from "express";
import { da, faker } from '@faker-js/faker';
import fs from 'fs';
import __dirname from "../utils.js";
import { parse } from "path";

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
        const rawData = fs.readFileSync(`${__dirname}/errors.log`, "utf-8");
        const lines = rawData.split("\n"); 
        const data = [];
        lines.forEach((el) => {
          try {
            const parseado  = JSON.parse(el);
            data.push(parseado);
          } catch (error) {
            console.error(`Error analizando JSON: ${error}`);
          }
        });
        
        return res.status(200).json({status: 'Success', payload: data})
    }else 
    {
        return res.status(200).json({status: 'Success', payload: {}})
    }
})

export default testRouter