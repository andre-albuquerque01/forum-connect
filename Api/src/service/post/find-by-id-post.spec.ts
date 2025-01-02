import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"
import { FindByIdPostService } from "./find-by-id-post"

let sut: FindByIdPostService
let userRepository: InMemoryUserRepository
let postRepository: InMemoryPostRepository

describe('Update service post', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        postRepository = new InMemoryPostRepository()
        sut = new FindByIdPostService(postRepository)
    })

    it("should be able update post", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        const postCreate = await postRepository.create({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        const { post } = await sut.execute({
            id: postCreate.id,
        })

        expect(post.id).toEqual(expect.any(String))
    })

    it("should not be able find post", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        await postRepository.create({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        await expect(() => sut.execute({
            id: '5',
        })).rejects.toBeInstanceOf(Error)
    })

})