import { Prisma } from "@prisma/client";

type PostWithRelations = Prisma.PostGetPayload<{
    include: {
        author: true;
        Comment: {
            include: {
                author: true;
            };
        };
    };
}>;

export class PostMapper {
    static toDomain(raw: PostWithRelations) {
        return {
            id: raw.id,
            title: raw.title,
            content: raw.content,
            createdAt: raw.createdAt,
            author: raw.author
                ? {
                      id: raw.author.id,
                      nickname: raw.author.nickname,
                  }
                : null,
            comments: raw.Comment.map(comment => ({
                id: comment.id,
                content: comment.content,
                author: comment.author
                    ? {
                          id: comment.author.id,
                          nickname: comment.author.nickname,
                      }
                    : null,
                createdAt: comment.createdAt,
            })),
        };
    }

    static toDomainList(rawList: PostWithRelations[]) {
        return rawList.map(post => PostMapper.toDomain(post));
    }
}
