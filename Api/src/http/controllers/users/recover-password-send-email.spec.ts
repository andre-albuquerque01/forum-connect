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

    it('should be able to recover password', async () => {
        const data = await MakeUserFactory.create({})
        
        const response = await request(app.server)
            .post('/recover-password')
            .send({
                email: data.email,
            })

        expect(response.status).toBe(200)
    })
})