import z from 'zod';

export const createVoteSchema = z.object({
    projectId: z.string().min(1),
    userId: z.string().min(1),
})