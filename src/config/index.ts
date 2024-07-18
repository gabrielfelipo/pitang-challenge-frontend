import { z } from 'zod'

const env = z
  .object({
    VITE_API_URL: z.string().optional().default('http://localhost:3000'),
    VITE_PUBLIC_URL: z.string().optional().default('http://localhost:5173/'),
  })
  .transform((original) => ({
    apiUrl: original.VITE_API_URL,
    publicUrl: original.VITE_PUBLIC_URL,
  }))
  .parse(import.meta.env)

export const config = {
  ...env,
}
