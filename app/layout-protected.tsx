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
    },
    verification: {
      google: 'nlXoUekknA8avDb5j2o9THmz1XR-CZxz5LN4EysJa6s',
      "msvalidate.01": "37C17140FA20C88C3AFE4734BF1A392E",
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