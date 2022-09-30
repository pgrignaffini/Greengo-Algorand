import { createCommentSchema, getProjectCommentsSchema, getSingleCommentSchema } from "../schema/comment.schema"
import { createRouter } from "./context"
import * as trpc from "@trpc/server"

export const commentRouter = createRouter()
    .mutation('create-comment', {
        input: createCommentSchema,
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                new trpc.TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to create a comment",
                })
            }

            const comment = await ctx.prisma.comment.create({
                data: {
                    text: input.text,
                    user: {
                        connect: {
                            id: ctx.session?.user?.id,
                        }
                    },
                    project: {
                        connect: {
                            id: input.projectId,
                        }
                    }
                }
            })

            return comment
        }
    })
    .query('comments', {
        resolve({ ctx }) {
            return ctx.prisma.comment.findMany({
                include: {
                    user: true,
                    project: true,
                }
            })
        }
    })
    .query('single-comment', {
        input: getSingleCommentSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.comment.findUnique({
                where: {
                    id: input.projectId
                },
                include: {
                    user: true,
                    project: true,
                }
            })
        }
    })
    .query('project-comments', {
        input: getProjectCommentsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.comment.findMany({
                where: {
                    projectId: input.projectId
                },
                include: {
                    user: true,
                }
            })
        }
    })