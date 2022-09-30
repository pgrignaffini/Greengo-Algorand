import z from 'zod';

export const createCommentSchema = z.object({
    text: z.string().min(5),
    projectId: z.string().uuid(),
})


export const getSingleCommentSchema = z.object({
    projectId: z.string().uuid(),
})

export const getProjectCommentsSchema = z.object({
    projectId: z.string().uuid(),
})
