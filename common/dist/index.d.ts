import z from "zod";
export declare const SignupValidation: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export declare const SigninValidation: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const InputUpdateValidation: z.ZodObject<{
    password: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export declare const BlogValidation: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export declare const BlogUpdateValidation: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
}>;
export declare const BlogTotalValidation: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    publishedAt: z.ZodEffects<z.ZodString, Date, string>;
    author: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
    }, {
        firstName: string;
        lastName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    id: string;
    publishedAt: Date;
    author: {
        firstName: string;
        lastName: string;
    };
}, {
    title: string;
    description: string;
    id: string;
    publishedAt: string;
    author: {
        firstName: string;
        lastName: string;
    };
}>;
export type SigninType = z.infer<typeof SigninValidation>;
export type SignupType = z.infer<typeof SignupValidation>;
export type BlogUpdateType = z.infer<typeof BlogUpdateValidation>;
export type InputUpdateType = z.infer<typeof InputUpdateValidation>;
export type BlogType = z.infer<typeof BlogValidation>;
export type BlogTotalType = z.infer<typeof BlogTotalValidation>;
