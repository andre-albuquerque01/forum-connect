import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { makeAuthenticateUserFactory } from "@/test/factories/make-authenticate-user-factory"

describe('Create Post (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create Post', async () => {
        const { token } = await makeAuthenticateUserFactory(app)

        const response = await request(app.server)
            .post(`/createPost`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'John Doe',
                content: 'johndoe@example.com',
            })

        expect(response.status).toBe(204)
    })
})