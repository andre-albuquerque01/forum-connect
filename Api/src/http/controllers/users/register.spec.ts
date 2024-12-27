import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { MakeUserFactory } from "@/test/factories/make-user-factory"

describe('Register (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register user', async () => {
        const data = await MakeUserFactory.create({})
        
        const response = await request(app.server)
            .post('/register')
            .send({
                name: data.name,
                email: data.email,
                password: data.password,
                passwordConfirmation: data.password,
                nickname: data.nickname,
            })

        expect(response.status).toBe(204)
    })
})