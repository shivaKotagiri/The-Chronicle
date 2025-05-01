import z from "zod";

export const SignupValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().max(25).optional(),
  lastName: z.string().max(25).optional(),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const InputUpdateValidation = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().max(25).optional(),
  lastName: z.string().max(25).optional(),
});


export const BlogValidation = z.object({
  title: z.string(),
  description: z.string(),
});

export const BlogUpdateValidation = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const BlogTotalValidation = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  publishedAt: z.string().transform((str) => new Date(str)),
  author: z.object({
    firstName: z.string(),
    lastName: z.string(),
  })
})


export type SigninType = z.infer<typeof SigninValidation>;
export type SignupType = z.infer<typeof SignupValidation>;
export type BlogUpdateType = z.infer<typeof BlogUpdateValidation>;
export type InputUpdateType = z.infer<typeof InputUpdateValidation>;
export type BlogType = z.infer<typeof BlogValidation>;
export type BlogTotalType = z.infer<typeof BlogTotalValidation>;



