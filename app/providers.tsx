'use client'

import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

export const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          suspense: true,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  )
}
