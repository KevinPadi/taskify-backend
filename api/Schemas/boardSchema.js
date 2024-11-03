import { z } from 'zod'

export const boardSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  })
})