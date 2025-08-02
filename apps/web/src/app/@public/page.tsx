import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import Link from 'next/link'

import { LoginForm } from './_components/login-form/form'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <Link className="mt-4 text-blue-500 hover:underline" href="/register">
            Don't have an account? Register
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
