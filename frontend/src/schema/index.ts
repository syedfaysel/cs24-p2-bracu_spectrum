import * as z from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters long',
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long"
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long"
  }),

})


export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(1, {
    message: "Password can not be empty"
  })
})