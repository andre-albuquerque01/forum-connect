import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"
import { SearchManyPostService } from "./search-many-post"

let sut: SearchManyPostService
let userRepository: InMemoryUserRepository
let postRepository: InMemoryPostRepository

describe('Search many service post', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        postRepository = new InMemoryPostRepository()
        sut = new SearchManyPostService(postRepository)
    })

    it("should be able to search posts", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        await Promise.all([
            postRepository.create({
                title: 'John Doe 1',
                content: 'johndoe@example.com',
                authorId: user.id
            }),
            postRepository.create({
                title: 'John Doe 2',
                content: 'johndoe@example.com',
                authorId: user.id
            }),
            postRepository.create({
                title: 'John Doe 3',
                content: 'johndoe@example.com',
                authorId: user.id
            })
        ])

        const { post } = await sut.execute({ query: 'John Doe 3', page: 1 })

        expect(post).toHaveLength(1)
    })
})