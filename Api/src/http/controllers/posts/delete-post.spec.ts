import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { prisma } from "@/lib/prisma"
import { makeAuthenticateUserFactory } from "@/test/factories/make-authenticate-user-factory"

describe('Delete Post (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete user', async () => {
        const { token } = await makeAuthenticateUserFactory(app)

        const data = await prisma.post.create({
            data: {
                title: 'John Doe',
                content: 'johndoe@example.com',
                authorId: '3b995394-e9a9-4989-8ddc-0aa981a40608',
            },
        })

        const response = await request(app.server)
            .get(`/deletePost/${data.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.status).toBe(201)
    })
})