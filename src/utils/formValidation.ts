import { z } from 'zod';

export const FormStateSchema = z.object({
  firstName: z.string().min(2, { message: 'First Name is required' }),
  lastName: z.string().min(2, { message: 'Last Name is required' }),
  email: z.string().email('Invalid email address'),
  age: z.number().int().min(16, 'Minimum age is 16'),
  ticketType: z.enum(['Standard', 'Economy', 'VIP']),
  dietaryRestrictions: z.string().optional(),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  paymentMethod: z.enum(['Credit Card', 'PayPal', 'Bank Transfer']),
  numberOfTickets: z
    .number()
    .int()
    .min(1, 'Minimum number of tickets is 1')
    .max(10, 'Maximum number of tickets is 10'),
  profilePicture: z.instanceof(File).optional(),
});

export type FormData = z.infer<typeof FormStateSchema>;
