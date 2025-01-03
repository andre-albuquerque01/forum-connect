import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { compare } from "bcryptjs"
import { AuthenticateService } from "./authenticate"
import { RegisterService } from "./register"

let registerService: RegisterService
let sut: AuthenticateService
let userRepository: InMemoryUserRepository

describe('Authenticate service user', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new AuthenticateService(userRepository)
        registerService = new RegisterService(userRepository)
    })

    it("should be able Authenticate user", async () => {
        await registerService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password123',
            nickname: 'john_doe'
        })

        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: 'password123',
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it("should not be able authenticate with wrong password", async () => {
        await registerService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password123',
            nickname: 'john_doe'
        })

        await expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: 'password',
        })).rejects.toBeInstanceOf(Error)
    })

    it("should not be able authenticate with wrong email", async () => {
        await registerService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password123',
            nickname: 'john_doe'
        })

        await expect(() => sut.execute({
            email: 'johndoe@exmple.com',
            password: 'password',
        })).rejects.toBeInstanceOf(Error)
    })
})