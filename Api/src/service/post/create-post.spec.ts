import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"
import { compare } from "bcryptjs"
import { CreatePostService } from "./create-post"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"

let sut: CreatePostService
let postRepository: InMemoryPostRepository
let userRepository: InMemoryUserRepository

describe('Create service post', () => {
    beforeEach(() => {
        postRepository = new InMemoryPostRepository()
        userRepository = new InMemoryUserRepository()
        sut = new CreatePostService(postRepository)
    })

    it("should be able create post", async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        const { post } = await sut.execute({
            title: 'John Doe',
            content: 'johndoe@example.com',
            authorId: user.id
        })

        expect(post.id).toEqual(expect.any(String))
    })
})