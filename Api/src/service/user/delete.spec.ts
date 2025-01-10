import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { DeleteService } from "./delete"
import { RegisterService } from "./register"

let sut: DeleteService
let userRepository: InMemoryUserRepository

describe('Delete service user', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new DeleteService(userRepository)
    })

    it("should be able delete user", async () => {
        const user  = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            nickname: 'john_doe',
            termService: true,
        })

        const { message } = await sut.execute({
            id: user.id
        })

        expect(message).toEqual("User deleted")
    })


    it("should be able not found", async () => {
        await expect(() => sut.execute({
            id: '1'
        })).rejects.toBeInstanceOf(Error)
    })
})