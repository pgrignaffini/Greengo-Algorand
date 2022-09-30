import z from 'zod';

export const createProjectSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    image: z.string(),
    banner: z.string(),
    description: z.string().min(1),
    website: z.string().url(),
    twitter: z.string().url(),
    discord: z.string().url(),
    start: z.string(),
    end: z.string(),
    goal: z.number().min(1),
})

export type CreateProjectInput = z.TypeOf<typeof createProjectSchema>;

export const getSingleProjectSchema = z.object({
    projectId: z.string().uuid(),
})