import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { MakeUserFactory } from "@/test/factories/make-user-factory"
import { MakeRecoverPassworSendEmail } from "@/test/factories/make-recover-password-send-email"

describe('Register (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to recover password', async () => {
        const user = await MakeUserFactory.create({})
        const token = await MakeRecoverPassworSendEmail.create({ userId: user.id })

        const response = await request(app.server)
            .post('/recover-password-update')
            .send({
                token,
                password: 'new-password',
                password_confirmation: 'new-password',
            })

        expect(response.status).toBe(200)
    })
})