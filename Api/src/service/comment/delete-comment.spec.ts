import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"
import { DeleteCommentService } from "./delete-comment"
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository"

let sut: DeleteCommentService
let userRepository: InMemoryUserRepository
let postRepository: InMemoryPostRepository
let commentRepository: InMemoryCommentRepository

describe('Delete service user', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        postRepository = new InMemoryPostRepository()
        commentRepository = new InMemoryCommentRepository()
        sut = new DeleteCommentService(commentRepository)
    })

    it("should be able delete user", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        const post = await postRepository.create({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        const comment = await commentRepository.create({
            content: 'johndoe@example.com',
            authorId: user.id,
            postId: post.id
        })

        const del = await sut.execute({ id: comment.id, authorId: user.id })

        expect(del.message).toEqual('success')
    })
})