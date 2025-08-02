'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

type Context = { [key: string]: string | undefined; API_URL?: string }

const Context = createContext({} as Context)

export const DotEnvProvider = ({ children, env }: PropsWithChildren<{ env: Context }>) => {
  return <Context.Provider value={env}>{children}</Context.Provider>
}

export const useDotEnv = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useDotEnv must be used within a DotEnvProvider')
  }

  return context
}
