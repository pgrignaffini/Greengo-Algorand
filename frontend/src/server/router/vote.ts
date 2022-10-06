import { createVoteSchema } from "../schema/vote.schema"
import { createRouter } from "./context"
import * as trpc from "@trpc/server"

export const voteRouter = createRouter()
    .mutation('add-vote', {
        input: createVoteSchema,
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                new trpc.TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to create a comment",
                })
            }

            const vote = await ctx.prisma.vote.create({
                data: {
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

            return vote
        }
    })
    .query('liked-projects', {
        resolve({ ctx }) {
            return ctx.prisma.vote.findMany({
                where: {
                    userId: ctx.session?.user?.id,
                },
                include: {
                    project: true,
                }
            })
        }
    })