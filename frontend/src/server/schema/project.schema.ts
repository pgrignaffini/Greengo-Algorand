import z from 'zod';

export const createProjectSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string(),
    image: z.string(),
    banner: z.string(),
    description: z.string().min(1),
    website: z.string(),
    twitter: z.string(),
    discord: z.string(),
    start: z.string().min(1),
    end: z.string().min(1),
    goal: z.string().min(1),
})

export const singleProjectSchema = z.object({
    projectId: z.string().min(1),
})

export const getUserProjectsSchema = z.object({
    creatorId: z.string().min(1),
})