import { createRouter } from "./context";
import { createProjectSchema, getSingleProjectSchema, getUserProjectsSchema } from "../schema/project.schema";
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
                },
            })
        }
    })
    .query('top-projects', {
        resolve({ ctx }) {
            return ctx.prisma.project.findMany({
                take: 9,
                include: {
                    creator: true,
                },
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
    .query('votes', {
        input: getSingleProjectSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.project.findUnique({
                where: {
                    id: input.projectId
                },
                include: {
                    votes: true,
                }
            })
        }
    })
    .query('user-projects', {
        input: getUserProjectsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.project.findMany({
                where: {
                    creatorId: input.creatorId
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
    .query('all-projects', {
        resolve({ ctx }) {
            return ctx.prisma.project.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            })
        }
    })