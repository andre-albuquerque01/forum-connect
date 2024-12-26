import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { makeAuthenticateUserFactory } from "@/test/factories/make-authenticate-user-factory"

describe('Profile (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to profile user', async () => {
        const { token } = await makeAuthenticateUserFactory(app)

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.status).toBe(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: 'johndoe@example.com',
        }))
    })
})