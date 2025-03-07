'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        layout: {
          logoPlacement: 'inside',
          socialButtonsVariant: 'blockButton',
          socialButtonsPlacement: 'bottom'
        }
      }}
    >
      {children}
    </ClerkProvider>
  )
} 