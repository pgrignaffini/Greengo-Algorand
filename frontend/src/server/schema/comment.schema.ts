import z from 'zod';

export const createCommentSchema = z.object({
    text: z.string().min(5),
    projectId: z.string().min(1),
})


export const getSingleCommentSchema = z.object({
    projectId: z.string().min(1),
})

export const getProjectCommentsSchema = z.object({
    projectId: z.string().min(1),
})
