import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { ProfileService } from "./profile"
import { RegisterService } from "./register"

let registerService: RegisterService
let sut: ProfileService
let userRepository: InMemoryUserRepository

describe('Profile service user', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new ProfileService(userRepository)
        registerService = new RegisterService(userRepository)
    })

    it("should be able Profile user", async () => {
        const data = await registerService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            passwordConfirmation: 'password123',
            nickname: 'john_doe',
            termService: true,
        })

        const { user } = await sut.execute({
            id: data.user.id
        })

        expect(user).toEqual(expect.objectContaining({ id: expect.any(String), }))
    })


    it("should not be able access profile", async () => {
        await expect(() => sut.execute({
            id: '1'
        })).rejects.toBeInstanceOf(Error)
    })
})