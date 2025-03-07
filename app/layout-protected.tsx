import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { Metadata } from 'next'

export const generateMetadata = ({ pathname }: { pathname: string }): Metadata => {
  const pageName = pathname.split('/').pop() || ''
  const capitalizedPage = pageName.charAt(0).toUpperCase() + pageName.slice(1)
  
  return {
    title: `${capitalizedPage} | Imaginify`,
    description: `${capitalizedPage} your images with Imaginify's AI-powered tools. Transform, enhance, and create stunning visuals instantly.`,
    alternates: {
      canonical: pathname,
    }
  }
}

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />

      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
      
      <Toaster />
    </main>
  )
}

export default ProtectedLayout 