'use server'

import { signIn } from '@repo/sdk/auth'

export const login = async (data: {
  accessToken: string
  expiresIn: number
  refreshToken: string
}) => {
  await signIn('credentials', data)
}
