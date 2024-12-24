import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from 'supertest'
import { prisma } from "@/lib/prisma"
import { makeAuthenticateUserFactory } from "@/test/factories/make-authenticate-user-factory"
import { MakePostFactory } from "@/test/factories/make-post-factory"
import { MakeUserFactory } from "@/test/factories/make-user-factory"
import { MakeCommentFactory } from "@/test/factories/make-comment-factory"

describe('Delete Post (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to update post', async () => {
        const user = await MakeUserFactory.create({})
        const post = await MakePostFactory.create({ authorId: user.id })
        const comment = await MakeCommentFactory.create({ authorId: user.id, postId: post.id })
        const { token } = await makeAuthenticateUserFactory(app)

        const response = await request(app.server)
            .get(`/findByIdComment/${comment.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.status).toBe(200)
    })
})