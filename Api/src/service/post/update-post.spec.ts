import { beforeEach, describe, expect, it } from "vitest"
import { UpdatePostService } from "./update-post"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"

let sut: UpdatePostService
let userRepository: InMemoryUserRepository
let postRepository: InMemoryPostRepository

describe('Update service post', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        postRepository = new InMemoryPostRepository()
        sut = new UpdatePostService(postRepository)
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

        const update = await sut.execute({
            id: post.id,
            title: 'John Doe Updated',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        expect(update.message).toEqual('success')
    })

    it("should not be able update post not found", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe',
            termService: true
        })

        await expect(() => sut.execute({
            id: '5',
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })).rejects.toBeInstanceOf(Error)
    })

    it("should not be able update post with invalid author", async () => {
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

        await expect(() => sut.execute({
            id: post.id,
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: '5'
        })).rejects.toBeInstanceOf(Error)
    })
})