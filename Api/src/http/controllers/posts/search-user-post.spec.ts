import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { MakeUserFactory } from "@/test/factories/make-user-factory"
import { MakePostFactory } from "@/test/factories/make-post-factory"

describe('Search Query Post (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search post', async () => {
        const user = await MakeUserFactory.create({})
        await MakePostFactory.create({ authorId: user.id })

        const response = await request(app.server)
            .get(`/search-user-post/${user.id}`)
            .send()

        expect(response.status).toBe(200)
    })
})