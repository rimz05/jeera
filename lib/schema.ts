import { z } from 'zod'
export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Maximum is 100 characters"),
  about: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  industryType: z.string().min(1, "Industry Type is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  image: z.string().optional(),
});

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Maximum is 100 characters"),
  description: z.string().optional(),
});

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Workspace name must be at least 3 characters." }),
  workspaceId: z.string(),
  description: z.string().optional(),
  memberAccess: z.array(z.string()).optional(),
});

