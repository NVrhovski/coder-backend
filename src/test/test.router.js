import { Router } from "express";
import { faker } from '@faker-js/faker';

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

export default testRouter