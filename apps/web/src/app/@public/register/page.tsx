'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'

import { RegistrationForm } from '../_components/registration-form.tsx/form'

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrationForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage
