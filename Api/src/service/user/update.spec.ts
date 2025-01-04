import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { UpdateService } from "./update"

let sut: UpdateService
let userRepository: InMemoryUserRepository

describe('Update service user', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new UpdateService(userRepository)
    })

    it("should be able update user", async () => {
        const data = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        const { user } = await sut.execute({
            id: data.id,
            name: 'John Doe Updated',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe_updated'
        })

        expect(user.nickname).toEqual('john_doe_updated')
    })

    it("should not be able update user with other email registrato", async () => {
        await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        const data = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password123',
            nickname: 'john_doe'
        })

        await expect(() => sut.execute({
            id: data.id,
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe'
        })).rejects.toBeInstanceOf(Error)
    })


})