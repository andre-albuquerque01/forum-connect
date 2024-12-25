import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'

describe('Fetch Recent Post (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch recent post', async () => {
        const response = await request(app.server)
            .get(`/updatePost/page=1`)
            .send()

        expect(response.status).toBe(200)
    })
})