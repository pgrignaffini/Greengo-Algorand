import z from 'zod';

export const createFundedProjectSchema = z.object({
    projectId: z.string().min(1),
    amount: z.number().min(0.005),
    account: z.string().min(1),
})

export const singleFundedProjectSchema = z.object({
    projectId: z.string().min(1),
})

export const getUserFundedProjectsSchema = z.object({
    account: z.string().min(1),
})