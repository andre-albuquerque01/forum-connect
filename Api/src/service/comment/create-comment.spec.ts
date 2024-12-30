import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"
import { CreateCommentService } from "./create-comment"
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"

let sut: CreateCommentService
let commentRepository: InMemoryCommentRepository
let postRepository: InMemoryPostRepository
let userRepository: InMemoryUserRepository

describe('Create service comment', () => {
    beforeEach(() => {
        postRepository = new InMemoryPostRepository()
        commentRepository = new InMemoryCommentRepository()
        userRepository = new InMemoryUserRepository()
        sut = new CreateCommentService(commentRepository, postRepository)
    })

    it("should be able create comment", async () => {
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

        const { comment } = await sut.execute({
            content: "Teste de comentário",
            authorId: user.id,
            postId: post.id,
        })

        expect(comment.id).toEqual(expect.any(String))
    })
})