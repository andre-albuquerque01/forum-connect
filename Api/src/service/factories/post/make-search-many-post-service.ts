import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository"
import { SearchManyPostService } from "@/service/post/search-many-post"

export function makeSearchManyPostService() {
    const postsRepository = new PrismaPostRepository()
    const searchmanyPostService = new SearchManyPostService(postsRepository)

    return searchmanyPostService
}