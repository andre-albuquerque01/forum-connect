import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository"
import { FindByIdCommentService } from "./find-by-id-comment"

let sut: FindByIdCommentService
let userRepository: InMemoryUserRepository
let postRepository: InMemoryPostRepository
let commentRepository: InMemoryCommentRepository


describe('Update service post', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        postRepository = new InMemoryPostRepository()
        commentRepository = new InMemoryCommentRepository()
        sut = new FindByIdCommentService(commentRepository)
    })

    it("should be able update post", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe',
            termService: true
        })

        const postCreate = await postRepository.create({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        const commentCreate = await commentRepository.create({
            content: "Teste de comentário",
            authorId: user.id,
            postId: postCreate.id,
        })

        const { comment } = await sut.execute({
            id: commentCreate.id,
        })

        expect(comment.id).toEqual(expect.any(String))
    })

    it("should not be able find comment", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe',
            termService: true
        })

        const postCreate = await postRepository.create({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        await commentRepository.create({
            content: "Teste de comentário",
            authorId: user.id,
            postId: postCreate.id,
        })

        await expect(() => sut.execute({
            id: '5',
        })).rejects.toBeInstanceOf(Error)
    })

})