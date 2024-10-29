import { z } from 'zod';

const listSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  board: z.string().min(1, { message: 'Board ID is required' }),
  order: z.number().positive({ message: 'Order must be a positive number' }),
});

export default listSchema;
