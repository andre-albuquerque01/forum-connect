import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository"
import { FetchRecentPostService } from "@/service/post/fetch-recent-post"

export function makeFetchRecentPostService() {
    const postsRepository = new PrismaPostRepository()
    const fetchRecentPostService = new FetchRecentPostService(postsRepository)

    return fetchRecentPostService
}