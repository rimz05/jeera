import { z } from 'zod'
export const userSchema = z.object({
    name: z.string()
    .min(2, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),

    about: z.string().optional(),
    country: z.string().min(1, 'Country is required'),
    industryType: z.string().min(1, 'Industry type is required'),
    email: z.email({ message: "Invalid email address" }),
    role: z.string().min(1, 'Role is required'),
    image: z.string().optional()
})