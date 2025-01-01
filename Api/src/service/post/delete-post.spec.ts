import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { DeletePostService } from "./delete-post"
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository"

let sut: DeletePostService
let userRepository: InMemoryUserRepository
let postRepository: InMemoryPostRepository

describe('Delete service user', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        postRepository = new InMemoryPostRepository()
        sut = new DeletePostService(postRepository)
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

        const del = await sut.execute({ id: post.id, authorId: user.id })

        expect(del.message).toEqual('success')
    })
})