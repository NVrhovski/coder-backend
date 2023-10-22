import { config } from 'dotenv';
import chai from 'chai';
import supertest from 'supertest';

config({ path: '.env' })
const expect = chai.expect;
const requester = supertest(`${process.env.HOST_URL}/api`);

describe('Products testing', () => {

    describe('Test list:', () => {

        let cookie;
        let cartId

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

        it('Should create a cart', async () => {

            const result = await requester.post('/carts')
            const { status, ok, _body } = result;
            cartId = _body.payload._id;

            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body.payload).to.be.ok;
        })

        it('Should get cart products', async () => {

            const result = await requester.get(`/carts/${cartId}`)
            const { status, ok, _body } = result;

            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body.payload).to.be.ok;
        })

        it('Should edit cart products', async () => {

            const newProductsData = {
                newProducts: [
                    {
                        product: '64bd54213f9d7dfe5839c87c',
                        quantity: 10
                    },
                    {
                        product: '64c8f1a7a3190baac81d825b',
                        quantity: 20
                    }
                ]
            }
            const result = await requester.put(`/carts/${cartId}`).send(newProductsData)

            const { status, ok, _body } = result;
            
            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body.payload).to.not.be.eq([]);
        })

        it('Should add product to cart', async () => {

            const result = await requester.post(`/carts/${cartId}/product/64c8f1c0a3190baac81d825d`)
            .set(
                'Cookie',
                [`${cookie.name}=${cookie.value}`]
            )
            .send({quantity: 5});

            const { status, ok, _body } = result;
           
            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body).to.be.ok;
        })

        it('Should edit product in cart', async () => {

            const result = await requester.put(`/carts/${cartId}/product/64c8f1c0a3190baac81d825d`)
            .set(
                'Cookie',
                [`${cookie.name}=${cookie.value}`]
            )
            .send({quantity: 10});

            const { status, ok, _body } = result;

            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body).to.be.ok;
        })

        it('Should delete product in cart', async () => {

            const result = await requester.put(`/carts/${cartId}/product/64c8f1c0a3190baac81d825d`)
            .set(
                'Cookie',
                [`${cookie.name}=${cookie.value}`]
            );

            const { status, ok, _body } = result;

            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body).to.be.ok;
        })

        it('Should delete cart products', async () => {

            const result = await requester.delete(`/carts/${cartId}`)
            const { status, ok } = result;
            
            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
        })

    })
})