import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { makeAuthenticateUserFactory } from "@/test/factories/make-authenticate-user-factory"

describe('Delete (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete user', async () => {
        const { token } = await makeAuthenticateUserFactory(app)

        const deleteResponse = await request(app.server)
            .get('/delete')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(deleteResponse.status).toBe(200)
    })
})