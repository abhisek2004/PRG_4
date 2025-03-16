import { z } from 'zod';

export const nameValidation = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(20, 'Name must be no more than 20 characters')
  .regex(/^[a-zA-Z0-9_ ]+$/, 'Name must not contain special characters');

export const signUpSchema = z.object({
  name: nameValidation,
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type SignUpData = z.infer<typeof signUpSchema>;