'use client'

import { ClerkProvider } from '@clerk/nextjs'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoPlacement: 'inside',
          socialButtonsVariant: 'blockButton',
          socialButtonsPlacement: 'bottom'
        },
        variables: {
          colorPrimary: '#7857FF',
          colorTextOnPrimaryBackground: '#ffffff',
        }
      }}
    >
      {children}
    </ClerkProvider>
  )
} 