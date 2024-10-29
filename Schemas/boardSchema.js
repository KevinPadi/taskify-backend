import { z } from 'zod'

export const createBoardSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  })
})