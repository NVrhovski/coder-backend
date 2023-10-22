import { config } from 'dotenv';
import chai from 'chai';
import supertest from 'supertest';

config({ path: '.env' })
const expect = chai.expect;
const requester = supertest(`${process.env.HOST_URL}/api`);

describe('Products testing', () => {

    describe('Test list:', () => {

        let cookie;
        let createdProductId;
        let newProduct;

        it('Should login', async () => {
            const loginData = {
                email: 'neyenvrhovski@gmail.com',
                password: 'cascotazo1'
            }
            const result = await requester.post('/session/login').send(loginData)
            const { status } = result;
            const cookieResult = result.headers['set-cookie'][0];
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1].split(';')[0]
            }
            
            expect(cookie.name).to.be.ok.and.eql('keyCookieForJWT');
            expect(cookie.value).to.be.ok;
            expect(status).to.be.eq(302);
        })

        it('Should get products', async () => {
            const result = await requester.get('/products');
            const { status, ok, _body } = result;
            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true)
            expect(_body.payload).to.be.ok
        })

        it('Should create a product', async () => {
            const mockProduct = {
                title: "Title Testing",
                description: "Desc Testing",
                code: "SQL-959",
                price: 960,
                status: false,
                stock: 200,
                category: "Health",
                thumbnails: [
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD4KiXALCNRTxmBfVFoZ_3ltI88OHREHFiA&usqp=CAU",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD4KiXALCNRTxmBfVFoZ_3ltI88OHREHFiA&usqp=CAU"
                ]
            }

            const result = await requester.post('/products').send(mockProduct)
            .set(
                'Cookie',
                [`${cookie.name}=${cookie.value}`]
            );
            const { status, ok, _body } = result;
            createdProductId = _body.payload._id;
            newProduct = _body.payload;

            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body.payload).to.be.ok;
        })

        it('Should get the created product', async () => {

            const result = await requester.get(`/products/${createdProductId}`);
            const { status, ok, _body } = result;
            
            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body.payload).to.be.ok;
        })

        it('Should update the created product', async () => {

            const newProductData = {
                title: "Title Testing nuevo",
                description: "Desc Testing",
                code: "SQL-959",
                price: 960,
                status: false,
                stock: 200,
                category: "Health",
                thumbnails: [
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD4KiXALCNRTxmBfVFoZ_3ltI88OHREHFiA&usqp=CAU",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD4KiXALCNRTxmBfVFoZ_3ltI88OHREHFiA&usqp=CAU"
                ]
            }
            const result = await requester.put(`/products/${createdProductId}`)
            .set(
                'Cookie',
                [`${cookie.name}=${cookie.value}`]
            ).send(newProductData)
            const { status, ok, _body } = result;

            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body.payload).to.not.be.eq(newProduct)
        })

        it('Should delete the created product', async () => {

            const result = await requester.delete(`/products/${createdProductId}`)
            .set(
                'Cookie',
                [`${cookie.name}=${cookie.value}`]
            );
            const { status, ok, _body } = result;

            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body.payload).to.be.ok;
        })
    })
})