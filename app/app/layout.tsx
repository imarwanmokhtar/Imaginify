import MobileSidebar from "@/components/shared/MobileSidebar"
import Sidebar from "@/components/shared/Sidebar"
import { Toaster } from "@/components/ui/toaster"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileSidebar />
      
      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
      
      <Toaster />
    </main>
  )
}

export default Layout