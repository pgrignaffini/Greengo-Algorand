import { createRouter } from "./context";
import { createProjectSchema, getSingleProjectSchema } from "../schema/project.schema";
import * as trpc from "@trpc/server"

export const projectRouter = createRouter()
    .mutation('create-project', {
        input: createProjectSchema,
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                new trpc.TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to create a project",
                })
            }

            const project = await ctx.prisma.project.create({
                data: {
                    ...input,
                    creator: {
                        connect: {
                            id: ctx.session?.user?.id,
                        }
                    }
                }
            })

            return project
        }
    })
    .query('projects', {
        resolve({ ctx }) {
            return ctx.prisma.project.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    creator: true,
                }
            })
        }
    })
    .query('single-project', {
        input: getSingleProjectSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.project.findUnique({
                where: {
                    id: input.projectId
                },
                include: {
                    creator: true,
                    comments: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                    }
                }
            })
        }
    })
