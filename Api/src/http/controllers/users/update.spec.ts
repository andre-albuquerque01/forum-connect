import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { randomUUID } from "crypto"
import { makeAuthenticateUserFactory } from "@/test/factories/make-authenticate-user-factory"

describe('Update (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to update user', async () => {
        const { token } = await makeAuthenticateUserFactory(app)

        const response = await request(app.server)
            .put('/update')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'John Doe',
                email: `johndoe${randomUUID()}@example.com`,
                password: 'password123',
                passwordConfirmation: 'password123',
                nickname: 'john_doe_nickname',
            })

        expect(response.status).toBe(201)
    })
})