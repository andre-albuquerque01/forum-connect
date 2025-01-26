import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"
import { UpdateCommentService } from "./update-comment"
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository"

let sut: UpdateCommentService
let userRepository: InMemoryUserRepository
let postRepository: InMemoryPostRepository
let commentRepository: InMemoryCommentRepository

describe('Update service post', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        postRepository = new InMemoryPostRepository()
        commentRepository = new InMemoryCommentRepository()
        sut = new UpdateCommentService(commentRepository)
    })

    it("should be able update post", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe',
            termService: true
        })

        const post = await postRepository.create({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        const commentCreate = await commentRepository.create({
            content: "Teste de comentário",
            authorId: user.id,
            postId: post.id,
        })

        const update = await sut.execute({
            id: commentCreate.id,
            content: 'johndoe@example.com',
            authorId: user.id
        })

        expect(update.message).toEqual('success')
    })

    it("should not be able update comment with wrong id", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe',
            termService: true
        })

        const post = await postRepository.create({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        await commentRepository.create({
            content: "Teste de comentário",
            authorId: user.id,
            postId: post.id,
        })

        await expect(() => sut.execute({
            id: '5',
            content: 'johndoe@example.com',
            authorId: user.id
        })).rejects.toBeInstanceOf(Error)
    })

    it("should not be able update comment with invalid author", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe',
            termService: true
        })

        const post = await postRepository.create({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        const comment = await commentRepository.create({
            content: "Teste de comentário",
            authorId: user.id,
            postId: post.id,
        })

        await expect(() => sut.execute({
            id: comment.id,
            content: 'johndoe@example.com',
            authorId: '5'
        })).rejects.toBeInstanceOf(Error)
    })
})