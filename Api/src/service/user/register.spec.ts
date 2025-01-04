import { beforeEach, describe, expect, it } from "vitest"
import { RegisterService } from "./register"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { compare } from "bcryptjs"

let sut: RegisterService
let userRepository: InMemoryUserRepository

describe('Register service user', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new RegisterService(userRepository)
    })

    it("should be able register user", async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password123',
            nickname: 'john_doe'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should be password equals", async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password123',
            nickname: 'john_doe'
        })

        const isPasswordCorrectly = await compare('password123', user.password)

        expect(isPasswordCorrectly).toBeTruthy()
    })

    it("should not be able register user same email twice", async () => {
        await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password123',
            nickname: 'john_doe'
        })

        await expect(() => sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password123',
            nickname: 'john_doe'
        })).rejects.toBeInstanceOf(Error)
    })

    it("should not be able register user without password confirmation", async () => {
        await expect(() => sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password12',
            nickname: 'john_doe'
        })).rejects.toBeInstanceOf(Error)
    })
})