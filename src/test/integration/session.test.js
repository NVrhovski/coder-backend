import { config } from 'dotenv';
import chai from 'chai';
import supertest from 'supertest';

config({ path: '.env' })
const expect = chai.expect;
const requester = supertest(`${process.env.HOST_URL}/api`);

describe('Products testing', () => {

    describe('Test list:', () => {

        let cookie;
        let registerData

        it('Should register', async () => {

            registerData = {
                first_name: "Nombre Test",
                last_name: "Apellido Test",
                email: "test@gmail.com",
                age: 20,
                password: "cascotazo"
            }

            const result = await requester.post('/session/register').send(registerData)
            const { status } = result;

            expect(status).to.be.eq(302)
        })

        it('Should login', async () => {

            const loginData = {
                email: 'test@gmail.com',
                password: 'cascotazo'
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

        it('Should get current user', async () => {

            const result = await requester.get('/session/current')
            .set(
                'Cookie',
                [`${cookie.name}=${cookie.value}`]
            );
            const { status, ok, _body } = result;

            expect(status).to.be.eq(200);
            expect(ok).to.be.eq(true);
            expect(_body.payload.email).to.be.eq(registerData.email)
        })

    })
})