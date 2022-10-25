import { createRouter } from "./context";
import { createFundedProjectSchema, singleFundedProjectSchema } from "../schema/fundedProject.schema";
import * as trpc from "@trpc/server"

export const fundedProjectRouter = createRouter()
    .mutation('fund-project', {
        input: createFundedProjectSchema,
        async resolve({ ctx, input }) {
            if (!ctx.session?.user) {
                new trpc.TRPCError({
                    code: "FORBIDDEN",
                    message: "You must be logged in to create a project",
                })
            }

            const fundedProject = await ctx.prisma.fundedProject.create({
                data: { ...input }
            })

            return fundedProject
        }
    })
    .query('funded-project-amount', {
        input: singleFundedProjectSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.fundedProject.groupBy({
                by: ['projectId'],
                where: { projectId: input.projectId },
                _sum: { amount: true }
            })
        }
    })
