import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { MakeUserFactory } from "@/test/factories/make-user-factory"

describe('Authenticate (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate user', async () => {
        const data = await MakeUserFactory.create({})

        const response = await request(app.server)
            .post('/sessions')
            .send({ email: data.email, password: data.password })

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })

    })
})