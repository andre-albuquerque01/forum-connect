import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"
import { FetchRecentPostService } from "./fetch-recent-post"

let sut: FetchRecentPostService
let userRepository: InMemoryUserRepository
let postRepository: InMemoryPostRepository

describe('Fetch recent post service', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        postRepository = new InMemoryPostRepository()
        sut = new FetchRecentPostService(postRepository)
    })

    it("should be able to fecth recent posts", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        await Promise.all([
            postRepository.create({
                title: 'John Doe',
                content: 'johndoe@example.com',
                authorId: user.id
            }),
            postRepository.create({
                title: 'John Doe',
                content: 'johndoe@example.com',
                authorId: user.id
            }),
            postRepository.create({
                title: 'John Doe',
                content: 'johndoe@example.com',
                authorId: user.id
            })
        ])

        const { post } = await sut.execute({ page: 1 })

        expect(post).toHaveLength(3)
    })
})